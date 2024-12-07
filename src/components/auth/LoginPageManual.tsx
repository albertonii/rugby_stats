// src/components/auth/LoginPage.jsx

const LoginPageManual = () => {
  const handleLogin = () => {
    const state = generateRandomString(16);
    sessionStorage.setItem("auth0_state", state);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
      scope: "openid profile email read:stats write:stats",
      state: state,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    });

    window.location.href = `https://${
      import.meta.env.VITE_AUTH0_DOMAIN
    }/authorize?${params.toString()}`;
  };

  const generateRandomString = (length) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  };

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
          onClick={() => handleLogin()}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default LoginPageManual;
