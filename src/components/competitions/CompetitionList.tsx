import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { competitions } from '../../data/competitions';
import { matches } from '../../data/matches';
import MatchList from '../matches/MatchList';

const CompetitionList = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const getCompetitionMatches = (competitionId: number) => {
    return matches.filter(match => 
      competitions.find(c => c.id === competitionId)?.matches.includes(match.id)
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Competiciones</h1>
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
          <option value="Rugby 7s">Rugby 7s</option>
          <option value="Rugby Playa">Rugby Playa</option>
        </select>
      </div>

      <div className="grid gap-6">
        {competitions
          .filter(comp => !selectedCategory || comp.category === selectedCategory)
          .map((competition) => {
            const competitionMatches = getCompetitionMatches(competition.id);
            const scheduledMatches = competitionMatches.filter(m => m.status === 'scheduled');
            const completedMatches = competitionMatches.filter(m => m.status === 'completed');
            const inProgressMatches = competitionMatches.filter(m => m.status === 'in_progress');

            return (
              <div
                key={competition.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link
                  to={`/competitions/${competition.id}`}
                  className="block p-6 border-b"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{competition.name}</h2>
                      <p className="text-gray-500">{competition.season}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      competition.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : competition.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {competition.status === 'active' ? 'En curso' :
                       competition.status === 'upcoming' ? 'Próximamente' : 'Finalizado'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><span className="font-medium">Categoría:</span> {competition.category}</p>
                      <p><span className="font-medium">Inicio:</span> {competition.startDate.toLocaleDateString()}</p>
                      <p><span className="font-medium">Fin:</span> {competition.endDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Equipos:</span> {competition.teams.length}</p>
                      <p><span className="font-medium">Partidos:</span> {competition.matches.length}</p>
                    </div>
                  </div>
                </Link>

                {/* Partidos en curso */}
                {inProgressMatches.length > 0 && (
                  <div className="p-4 bg-blue-50">
                    <h3 className="font-semibold mb-2 text-blue-800">Partidos en curso</h3>
                    <MatchList matches={inProgressMatches} showDetails={true} />
                  </div>
                )}

                {/* Próximos partidos */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center">
                        <span className="font-semibold">
                          Próximos partidos ({scheduledMatches.length})
                        </span>
                        <ChevronDownIcon
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-gray-500 transition-transform`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="p-6 bg-gray-50">
                        <MatchList matches={scheduledMatches} showDetails={true} />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Últimos resultados */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center border-t">
                        <span className="font-semibold">
                          Últimos resultados ({completedMatches.length})
                        </span>
                        <ChevronDownIcon
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-gray-500 transition-transform`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="p-6 bg-gray-50">
                        <MatchList
                          matches={completedMatches.slice(0, 5)}
                          showDetails={true}
                        />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CompetitionList;