import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";
import { UserRoles } from "../types";

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
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://rugby-stats.com/api",
              scope: "openid profile email",
            },
          });

          console.log("Token obtained:", token); // For debugging

          const decodedToken = jwtDecode(token);
          console.log("Decoded token:", decodedToken); // For debugging

          // Get roles from the token
          const namespace = "https://rugby-stats.com";
          const roles = decodedToken[`${namespace}/roles`] || [];
          const clubId = decodedToken[`${namespace}/clubId`];

          const isAdmin = roles.includes("admin");
          const isClubDelegate = roles.includes("club_delegate");

          setUserRoles({
            isAdmin,
            isClubDelegate,
            clubId,
          });

          // Only redirect if we're not already on the admin page
          // if (
          //   (isAdmin || isClubDelegate) &&
          //   !location.pathname.startsWith("/admin")
          // ) {
          //   window.location.href = "/admin";
          // }
        } catch (error) {
          console.error("Error getting access token:", error);
          // Handle token error - maybe redirect to login
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
  }, [
    isAuthenticated,
    user,
    getAccessTokenSilently,
    location.pathname,
    isLoading,
  ]);

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      console.error("Auth0 error:", error);
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
        authorizationParams: {
          audience: "https://dev-ewwuhrnxs8ffun1f.eu.auth0.com/api/v2/",
          scope: "openid profile email",
        },
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
