import { useState } from 'react';
import { Link } from 'react-router-dom';
import { players } from '../data/players';
import { teams } from '../data/teams';

const PlayersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const getTeamName = (teamId: number) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : 'N/A';
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = !searchTerm || 
      `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || 
      teams.find(t => t.id === player.teamId)?.category === selectedCategory;
    const matchesTeam = !selectedTeam || player.teamId.toString() === selectedTeam;
    return matchesSearch && matchesCategory && matchesTeam;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Jugadores</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Buscar jugador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
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
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">Todos los equipos</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jugador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posición
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlayers.map((player) => (
                <tr 
                  key={player.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => window.location.href = `/players/${player.id}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/players/${player.id}`} className="block">
                      <div className="text-sm font-medium text-gray-900">
                        {player.firstName} {player.lastName}
                      </div>
                      {player.nickname && (
                        <div className="text-sm text-gray-500">
                          "{player.nickname}"
                        </div>
                      )}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getTeamName(player.teamId)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{player.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{player.number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      player.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : player.status === 'injured'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {player.status === 'active' ? 'Activo' : 
                       player.status === 'injured' ? 'Lesionado' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayersList;