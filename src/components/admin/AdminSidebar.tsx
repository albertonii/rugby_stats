import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  TrophyIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: HomeIcon },
    { path: '/admin/users', label: 'Usuarios', icon: UsersIcon },
    { path: '/admin/players', label: 'Jugadores', icon: UserGroupIcon },
    { path: '/admin/clubs', label: 'Clubes', icon: BuildingOfficeIcon },
    { path: '/admin/teams', label: 'Equipos', icon: ShieldCheckIcon },
    { path: '/admin/categories', label: 'Categorías', icon: ClipboardDocumentListIcon },
    { path: '/admin/competitions', label: 'Competiciones', icon: TrophyIcon },
    { path: '/admin/settings', label: 'Configuración', icon: Cog6ToothIcon },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Panel Admin</h2>
        <Link to="/" className="text-sm text-blue-600 hover:text-blue-800">
          ← Volver al inicio
        </Link>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg hover:bg-gray-100 ${
                  location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;