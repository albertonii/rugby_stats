import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./contexts/AuthContext";

console.log("window.location.origin:", window.location.origin);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/callback`,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    }}
    cacheLocation="localstorage" // Asegura persistencia
  >
    <AuthProvider>
      <App />
    </AuthProvider>
  </Auth0Provider>
);
