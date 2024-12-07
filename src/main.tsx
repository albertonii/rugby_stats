import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { AuthProviderManual } from "./contexts/AuthContextManual";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProviderManual>
    {/* // <Auth0Provider
  //   domain={import.meta.env.VITE_AUTH0_DOMAIN}
  //   clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
  //   authorizationParams={{
  //     redirect_uri: `${window.location.origin}/callback`,
  //     audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  //     scope: "openid profile email read:stats write:stats", // Scopes definidos
  //   }}
  //   cacheLocation="memory" // Asegura persistencia
  //   useRefreshTokens={true} // Mejora el manejo de tokens
  // > */}
    {/* <AuthProvider> */}
    <App />

    {/* </AuthProvider> */}
    {/* </Auth0Provider> */}
  </AuthProviderManual>
);
