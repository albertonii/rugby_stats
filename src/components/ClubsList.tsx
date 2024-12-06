import { useState } from 'react';
import { Link } from 'react-router-dom';
import { clubs } from '../data/clubs';
import { teams } from '../data/teams';
import { players } from '../data/players';

const ClubsList = () => {
  const [selectedIsland, setSelectedIsland] = useState('');

  const islands = ['Gran Canaria', 'Tenerife', 'Lanzarote', 'Fuerteventura'];

  const getClubTeams = (clubId: number) => {
    return teams.filter(team => team.clubId === clubId);
  };

  const getClubPlayers = (clubId: number) => {
    return players.filter(player => player.clubId === clubId);
  };

  const filteredClubs = clubs.filter(club => 
    !selectedIsland || club.island === selectedIsland
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Clubes</h2>
        <select
          value={selectedIsland}
          onChange={(e) => setSelectedIsland(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Todas las islas</option>
          {islands.map(island => (
            <option key={island} value={island}>{island}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {filteredClubs.map(club => {
          const clubTeams = getClubTeams(club.id);
          const clubPlayers = getClubPlayers(club.id);

          return (
            <Link
              key={club.id}
              to={`/clubs/${club.id}`}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{club.name}</h3>
                    <p className="text-gray-500">{club.city}, {club.island}</p>
                  </div>
                  {club.logo && (
                    <img 
                      src={club.logo} 
                      alt={`${club.name} logo`} 
                      className="h-16 w-16 object-contain"
                    />
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Información General</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Fundado en: {club.foundedYear}</p>
                      <p>Campo Principal: {club.mainField}</p>
                      <p>Equipos: {clubTeams.length}</p>
                      <p>Jugadores: {clubPlayers.length}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Equipos</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {clubTeams.map(team => (
                        <p key={team.id}>• {team.category}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ClubsList;