import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UsersIcon, 
  ClipboardDocumentListIcon, 
  TrophyIcon, 
  UserGroupIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats] = useState({
    totalTeams: 10,
    totalPlayers: 250,
    totalMatches: 24,
    pendingMatches: 12,
  });

  const quickActions = [
    {
      name: 'Gestionar Usuarios',
      description: 'Administrar delegados y staff',
      icon: UsersIcon,
      to: '/admin/users',
      color: 'bg-blue-500'
    },
    {
      name: 'Jugadores',
      description: 'Gestionar jugadores',
      icon: UserGroupIcon,
      to: '/admin/players',
      color: 'bg-green-500'
    },
    {
      name: 'Competiciones',
      description: 'Gestionar ligas y torneos',
      icon: TrophyIcon,
      to: '/admin/competitions',
      color: 'bg-purple-500'
    },
    {
      name: 'Categorías',
      description: 'Gestionar categorías',
      icon: ClipboardDocumentListIcon,
      to: '/admin/categories',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Panel de Control</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center mt-2">
            <HomeIcon className="h-5 w-5 mr-1" />
            Volver al inicio
          </Link>
        </div>
        <div className="text-sm text-gray-500">
          Temporada 2023/2024
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm">Equipos Totales</h3>
          <p className="text-3xl font-bold">{stats.totalTeams}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm">Jugadores Registrados</h3>
          <p className="text-3xl font-bold">{stats.totalPlayers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm">Partidos Totales</h3>
          <p className="text-3xl font-bold">{stats.totalMatches}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm">Partidos Pendientes</h3>
          <p className="text-3xl font-bold">{stats.pendingMatches}</p>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Link
            key={action.name}
            to={action.to}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex p-3 rounded-lg ${action.color} text-white mb-4`}>
              <action.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">{action.name}</h3>
            <p className="text-sm text-gray-500">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Actividad Reciente */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="font-medium">Nuevo jugador registrado</p>
              <p className="text-sm text-gray-500">CRLP Senior Masculino</p>
            </div>
            <span className="text-sm text-gray-500">Hace 1 hora</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="font-medium">Resultado actualizado</p>
              <p className="text-sm text-gray-500">LPRC vs URU GC</p>
            </div>
            <span className="text-sm text-gray-500">Hace 3 horas</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Nueva competición creada</p>
              <p className="text-sm text-gray-500">Copa Canaria Senior Masculino</p>
            </div>
            <span className="text-sm text-gray-500">Hace 1 día</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;