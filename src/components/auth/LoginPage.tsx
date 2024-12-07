import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { login, isAuthenticated, isAdmin, isClubDelegate } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("DENTRO DE LOGIN PAGE");
      if (isAdmin || isClubDelegate) {
        const from = location.state?.from?.pathname || "/admin";
        navigate(from, { replace: true });
      } else {
        navigate("/unauthorized", { replace: true });
      }
    }
  }, [isAuthenticated, isAdmin, isClubDelegate, navigate, location]);

  return <button onClick={() => loginWithRedirect()}>Log In</button>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Acceso Administración
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Inicia sesión para acceder al panel de administración
        </p>
        <button
          onClick={() => login()}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
