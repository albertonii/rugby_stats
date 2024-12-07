// src/CallbackPage.jsx
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const { handleRedirectCallback, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const url = window.location.href;
        await handleRedirectCallback(url);
        await handleRedirectCallback();
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Error handling redirect callback:", err);
        navigate("/login", { replace: true });
      }
    };

    handleAuth();
  }, [handleRedirectCallback, navigate]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>Procesando autenticación...</div>;
};

export default CallbackPage;
