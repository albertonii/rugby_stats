import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserIcon,
  ChartBarIcon,
  XMarkIcon,
  Bars3Icon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContextManual";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, login, logout, isClubDelegate, isAdmin } =
    useAuth();

  return (
    <div className="flex flex-col relative ">
      {/* Top Bar */}
      <div className="container mx-auto px-4 justify-center flex items-center h-16 gap-2 sm:gap-4 bg-gradient-to-r from-yellow-600 to-yellow-500 ">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        <div className="w-full flex justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <img
                src="/rugby-ball-icon.svg"
                alt="Rugby Stats"
                className="h-8 w-8"
              />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold truncate">
                Rugby Stats
              </h1>
              <p className="text-blue-200 text-xs truncate">FCR</p>
            </div>
          </Link>

          {/* Auth Section */}
          <div className="flex flex-row items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 text-white">
                  <img
                    src={user?.picture}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="hidden sm:block text-sm truncate">
                    {user?.name}
                  </span>
                </div>

                {(isAdmin || isClubDelegate) && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-white">
                    <UserIcon className="h-5 w-5" />
                    <span className="hidden sm:block">Dashboard</span>
                  </Link>
                )}

                <button
                  onClick={() => logout()}
                  className="text-white hover:text-blue-200 text-sm">
                  <span className="hidden sm:block">Cerrar Sesión</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M3 4.5a1 1 0 011-1h6a1 1 0 110 2H5v9h5a1 1 0 110 2H4a1 1 0 01-1-1v-11zM13.293 9.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L15.586 14H9a1 1 0 110-2h6.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
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
      <div
        className={`md:hidden ${
          isMenuOpen ? "absolute top-[60px]" : "hidden"
        } bg-yellow-600 overflow-hidden`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <nav className="container border-2 border-yellow-700 shadow-xl rounded-sm mx-auto px-4 py-2 flex flex-col space-y-2">
          <Link
            to="/"
            className="text-white hover:text-blue-200 flex items-center space-x-1 hover:bg-yellow-500 px-4 py-2 ">
            <UserGroupIcon className="h-4 w-4" />
            <span>Clubes</span>
          </Link>
          <Link
            to="/players"
            className="text-white hover:text-blue-200 flex items-center space-x-1 hover:bg-yellow-500 px-4 py-2 ">
            <UserIcon className="h-4 w-4" />
            <span>Jugadores</span>
          </Link>
          <Link
            to="/matches"
            className="text-white hover:text-blue-200 flex items-center space-x-1 hover:bg-yellow-500 px-4 py-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <ellipse cx="12" cy="12" rx="10" ry="7" />
              <path d="M2 12a10 7 0 0 0 20 0M2 12a10 7 0 0 1 20 0" />
            </svg>
            <span>Partidos</span>
          </Link>
          <Link
            to="/competitions"
            className="text-white hover:text-blue-200 flex items-center space-x-1 hover:bg-yellow-500 px-4 py-2 ">
            <TrophyIcon className="h-4 w-4" />
            <span>Competiciones</span>
          </Link>
          <Link
            to="/stats"
            className="text-white hover:text-blue-200 flex items-center space-x-1 hover:bg-yellow-500 px-4 py-2 ">
            <ChartBarIcon className="h-4 w-4" />
            <span>Estadísticas</span>
          </Link>
        </nav>
      </div>

      {/* Desktop Navigation */}
      <div
        className={`hidden md:block  md:bg-transparent md:block container mx-auto bg-gradient-to-r from-gray-700 to-gray-500 `}>
        <nav className="container mx-auto px-4 flex flex-row items-center space-x-8 h-12">
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
  );
};

export default Navbar;
