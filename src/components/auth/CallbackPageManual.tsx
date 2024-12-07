// src/components/auth/CallbackPage.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CallbackPageManual = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authenticate = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
      const state = queryParams.get("state");

      if (!code || !state) {
        console.error("Código o estado faltante en la URL");
        navigate("/login", { replace: true });
        return;
      }

      // Paso 2: Validar el estado
      const storedState = sessionStorage.getItem("auth0_state");
      if (state !== storedState) {
        console.error("Estado inválido");
        navigate("/login", { replace: true });
        return;
      }

      // Paso 3: Intercambiar el código por tokens
      try {
        const tokenResponse = await axios.post(
          `https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`,
          {
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
            client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET, // Si es necesario
            code: code,
            redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { access_token, id_token, refresh_token } = tokenResponse.data;

        // Paso 4: Manejar los tokens
        // Almacenar los tokens de forma segura
        sessionStorage.setItem("access_token", access_token);
        sessionStorage.setItem("id_token", id_token);
        if (refresh_token) {
          sessionStorage.setItem("refresh_token", refresh_token);
        }

        // Redirigir al usuario a la página principal o a donde desees
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Error intercambiando el código por tokens:", error);
        navigate("/login", { replace: true });
      }
    };

    authenticate();
  }, [location, navigate]);

  return <div>Procesando autenticación...</div>;
};

export default CallbackPageManual;
