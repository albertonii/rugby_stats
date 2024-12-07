import { createContext, useContext, useState, useEffect } from "react";
import { decodeToken } from "../utils";

interface AuthContextType {
  isLoading: boolean;
  accessToken: string;
  idToken: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isClubDelegate: boolean;
  clubId?: number;
  user: any;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProviderManual = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClubDelegate, setIsClubDelegate] = useState(false);
  const [clubId, setClubId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const storedAccessToken = sessionStorage.getItem("access_token");
    const storedIdToken = sessionStorage.getItem("id_token");

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedIdToken) {
      setIdToken(storedIdToken);
      const decodedToken = decodeToken(storedIdToken);
      console.log("DECODED", decodedToken);

      if (decodedToken) {
        setUser(decodedToken);
        const namespace = "https://rugby-stats.com/user_metadata"; // Debe coincidir con tu configuración en Auth0
        const userMetadata = decodedToken[namespace] || {};

        const clubId = userMetadata.clubId;
        const roles = userMetadata.roles || [];

        setIsAdmin(roles.includes("admin"));
        setIsClubDelegate(roles.includes("club_delegate")); // Asegúrate de que el nombre del rol sea correcto
        setClubId(clubId);
      }
    }

    setIsLoading(false);
  }, []);

  const login = () => {
    window.location.href = "/login";
  };

  const logout = () => {
    sessionStorage.clear();
    setAccessToken(null);
    setIdToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        accessToken,
        idToken,
        isAuthenticated: !!accessToken,
        isAdmin,
        isClubDelegate,
        clubId,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
