// src/components/HomePage.jsx
import { useAuth } from "../contexts/AuthContextManual";

const TokenPage = () => {
  const { accessToken, idToken, logout } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      {accessToken ? (
        <div>
          <p>Access Token: {accessToken}</p>
          <p>ID Token: {idToken}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>No estás autenticado.</p>
      )}
    </div>
  );
};

export default TokenPage;
