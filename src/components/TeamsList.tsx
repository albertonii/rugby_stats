import { useState } from 'react';
import { clubs } from '../data/clubs';
import { teams } from '../data/teams';

const TeamsList = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIsland, setSelectedIsland] = useState('');

  const categories = ['Senior Masculino', 'Senior Femenino', 'Sub-18', 'Sub-16'];
  const islands = ['Gran Canaria', 'Tenerife', 'Lanzarote'];

  const getTeamsByClub = (clubId: number) => {
    return teams.filter(team => 
      team.clubId === clubId && 
      (selectedCategory ? team.category === selectedCategory : true)
    );
  };

  const filteredClubs = clubs.filter(club => 
    selectedIsland ? club.island === selectedIsland : true
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Equipos</h2>
        <div className="flex space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

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
      </div>

      <div className="grid gap-6">
        {filteredClubs.map(club => {
          const clubTeams = getTeamsByClub(club.id);
          if (clubTeams.length === 0) return null;

          return (
            <div key={club.id} className="bg-white rounded-lg shadow overflow-hidden">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clubTeams.map(team => (
                    <div 
                      key={team.id} 
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <h4 className="font-semibold mb-2">{team.name}</h4>
                      <div className="space-y-2 text-sm text-gray-500">
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
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamsList;