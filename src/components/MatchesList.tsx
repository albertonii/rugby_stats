import { useState } from 'react';
import { Link } from 'react-router-dom';
import { matches } from '../data/matches';
import { teams } from '../data/teams';

const MatchesList = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const getTeamName = (teamId: number) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : 'N/A';
  };

  const filteredMatches = matches.filter(match =>
    !selectedCategory || match.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Partidos</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between p-4 border-b">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">Todas las categorías</option>
            <option value="Senior Masculino">Senior Masculino</option>
            <option value="Senior Femenino">Senior Femenino</option>
            <option value="Sub-18">Sub-18</option>
            <option value="Sub-16">Sub-16</option>
          </select>
        </div>

        <div className="grid gap-4 p-4">
          {filteredMatches.map((match) => (
            <Link
              key={match.id}
              to={`/matches/${match.id}`}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Liga Canaria</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  match.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : match.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {match.status === 'completed' ? 'Finalizado' :
                   match.status === 'in_progress' ? 'En Juego' : 'Programado'}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <div className="flex-1">
                  <p className="font-semibold">{getTeamName(match.homeTeamId)}</p>
                  <p className="font-semibold">{getTeamName(match.awayTeamId)}</p>
                </div>
                <div className="text-center px-4">
                  {match.status === 'completed' ? (
                    <div className="text-2xl font-bold">
                      <p>{match.homeScore}</p>
                      <p>{match.awayScore}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {new Date(match.date).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-2 text-sm text-gray-500">
                <p>{match.venue}</p>
                <p>{new Date(match.date).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesList;