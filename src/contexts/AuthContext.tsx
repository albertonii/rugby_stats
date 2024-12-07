// src/contexts/AuthContext.jsx o src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode"; // Corregido
import { UserRoles } from "../types"; // Asegúrate de tener este tipo definido

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isClubDelegate: boolean;
  clubId?: number;
  user: any;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
    isLoading,
    error,
  } = useAuth0();

  const [userRoles, setUserRoles] = useState<UserRoles>({
    isAdmin: false,
    isClubDelegate: false,
    clubId: undefined,
  });

  useEffect(() => {
    const getUserRoles = async () => {
      console.log("Checking user roles..."); // For debugging
      console.log("Is authenticated:", isAuthenticated); // For debugging
      console.log("User:", user); // For debugging

      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          console.log("Token obtained:", token); // For debugging

          const decodedToken = jwtDecode(token);
          console.log("Decoded token:", decodedToken); // For debugging

          // Obtener roles del token
          const namespace = "https://rugby-stats.com"; // Asegúrate de que coincida con tu configuración en Auth0
          const roles = decodedToken[`${namespace}/roles`] || [];
          const clubId = decodedToken[`${namespace}/clubId`];

          const isAdmin = roles.includes("admin");
          const isClubDelegate = roles.includes("club_delegate");

          setUserRoles({
            isAdmin,
            isClubDelegate,
            clubId,
          });
        } catch (error) {
          console.error("Error getting access token:", error);
          // Manejar el error del token, por ejemplo, cerrar sesión
          auth0Logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          });
        }
      }
    };

    if (!isLoading) {
      getUserRoles();
    }
  }, [isAuthenticated, user, getAccessTokenSilently, isLoading]);

  // Manejar errores de autenticación
  useEffect(() => {
    if (error) {
      console.error("Auth0 error:", error);
      // Puedes redirigir a una página de error o mostrar un mensaje
      // window.location.href = "/";
    }
  }, [error]);

  const value = {
    isAuthenticated,
    isAdmin: userRoles.isAdmin,
    isClubDelegate: userRoles.isClubDelegate,
    clubId: userRoles.clubId,
    user,
    login: () =>
      loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      }),
    logout: () =>
      auth0Logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
