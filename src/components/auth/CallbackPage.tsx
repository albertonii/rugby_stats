// src/components/auth/CallbackPage.jsx
import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const { handleRedirectCallback, error, isLoading } = useAuth0();
  const navigate = useNavigate();
  const hasHandled = useRef(false); // Flag para evitar múltiples manejos

  useEffect(() => {
    const handleAuth = async () => {
      if (hasHandled.current || isLoading) {
        return; // Evita múltiples llamadas
      }
      hasHandled.current = true;

      try {
        console.log("CallbackPage Mounted");
        console.log("Current Location:", location.pathname, location.search);

        await handleRedirectCallback(location.pathname + location.search);
        console.log("Redirect callback handled successfully");
        // navigate("/", { replace: true });
      } catch (err) {
        console.error("Error handling redirect callback:", err);
        // navigate("/login", { replace: true });
      }
    };

    handleAuth();
  }, [handleRedirectCallback, navigate, isLoading]);

  if (error) {
    console.error("Auth0 Error:", error);
    return <div>Error: {error.message}</div>;
  }

  return <div>Procesando autenticación...</div>;
};

export default CallbackPage;
