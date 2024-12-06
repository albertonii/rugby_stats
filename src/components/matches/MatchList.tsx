import { useState } from 'react';
import { Match } from '../../types';
import MatchDetails from './MatchDetails';
import { teams } from '../../data/teams';

interface MatchListProps {
  matches: Match[];
  showDetails?: boolean;
}

const MatchList = ({ matches, showDetails = false }: MatchListProps) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const getTeamName = (teamId: number) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : 'N/A';
  };

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <div
          key={`match-${match.id}`}
          className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => showDetails && setSelectedMatch(match)}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">{match.round}</span>
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
          
          <div className="flex justify-between items-center">
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
        </div>
      ))}

      {selectedMatch && (
        <MatchDetails
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
};

export default MatchList;