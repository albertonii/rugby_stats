import { Link } from "react-router-dom";
import { UserIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, isAdmin, isClubDelegate, user, login, logout } =
    useAuth();

  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-600">
      {/* Top Bar with Logo and Auth */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <img
                src="/rugby-ball-icon.svg"
                alt="Rugby Stats"
                className="h-8 w-8"
              />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">Rugby Stats</h1>
              <p className="text-blue-200 text-xs">
                Federación Canaria de Rugby
              </p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 text-white">
                  <img
                    src={user?.picture}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm">{user?.name}</span>
                </div>

                {(isAdmin || isClubDelegate) && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-white">
                    <UserIcon className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                )}

                <button
                  onClick={() => logout()}
                  className="text-white hover:text-blue-200 text-sm">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => login()}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-white">
                <UserIcon className="h-5 w-5" />
                <span>Iniciar Sesión</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-blue-900/50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8 h-12">
            <Link
              to="/"
              className="text-white hover:text-blue-200 flex items-center space-x-1">
              <span>Clubes</span>
            </Link>
            <Link
              to="/players"
              className="text-white hover:text-blue-200 flex items-center space-x-1">
              <span>Jugadores</span>
            </Link>
            <Link
              to="/matches"
              className="text-white hover:text-blue-200 flex items-center space-x-1">
              <span>Partidos</span>
            </Link>
            <Link
              to="/competitions"
              className="text-white hover:text-blue-200 flex items-center space-x-1">
              <span>Competiciones</span>
            </Link>
            <Link
              to="/stats"
              className="text-white hover:text-blue-200 flex items-center space-x-1">
              <ChartBarIcon className="h-4 w-4" />
              <span>Estadísticas</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
