import { Link } from 'react-router-dom';
import { Team } from '../types';

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Link 
      to={`/teams/${team.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4"
    >
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{team.name}</h3>
        <div className="text-sm text-gray-500 space-y-1">
          <p>Categoría: {team.category}</p>
          <p>Temporada: {team.season}</p>
          <p>Campo: {team.homeField}</p>
          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
            team.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {team.status === 'active' ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default TeamCard;