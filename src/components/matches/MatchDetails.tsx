import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Match } from '../../types';
import { teams } from '../../data/teams';
import { players } from '../../data/players';

interface MatchDetailsProps {
  match: Match;
  onClose: () => void;
}

const MatchDetails = ({ match, onClose }: MatchDetailsProps) => {
  const homeTeam = teams.find(t => t.id === match.homeTeamId);
  const awayTeam = teams.find(t => t.id === match.awayTeamId);

  const getPlayerName = (playerId?: number) => {
    if (!playerId) return null;
    const player = players.find(p => p.id === playerId);
    return player ? `${player.firstName} ${player.lastName}` : null;
  };

  const getTeamRoster = (teamId: number) => {
    if (!match.roster) return [];
    const playerIds = teamId === match.homeTeamId ? match.roster.homeTeam : match.roster.awayTeam;
    return players.filter(p => playerIds.includes(p.id));
  };

  const homeTeamRoster = getTeamRoster(match.homeTeamId);
  const awayTeamRoster = getTeamRoster(match.awayTeamId);

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Match Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <Dialog.Title className="text-xl font-bold">
                {homeTeam?.name} vs {awayTeam?.name}
              </Dialog.Title>
              <p className="text-gray-500">{match.round}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>

          {/* Match Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <p className="font-bold">{homeTeam?.name}</p>
                <p className="text-3xl font-bold">{match.homeScore}</p>
              </div>
              <div className="text-xl font-bold px-4">VS</div>
              <div className="text-center flex-1">
                <p className="font-bold">{awayTeam?.name}</p>
                <p className="text-3xl font-bold">{match.awayScore}</p>
              </div>
            </div>
          </div>

          {/* Match Details */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Información del Partido</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Fecha:</span> {new Date(match.date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <p><span className="font-medium">Hora:</span> {new Date(match.date).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p><span className="font-medium">Lugar:</span> {match.venue}</p>
              <p><span className="font-medium">Estado:</span> {
                match.status === 'completed' ? 'Finalizado' :
                match.status === 'in_progress' ? 'En juego' : 'Programado'
              }</p>
            </div>
          </div>

          {/* Referee Information */}
          {match.referee && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Equipo Arbitral</h3>
              <div className="space-y-1 text-sm">
                {match.referee.map((ref, index) => (
                  <p key={index}>
                    <span className="font-medium">
                      {ref.role === 'main' ? 'Árbitro Principal' :
                       ref.role === 'assistant1' ? 'Juez de Línea 1' :
                       ref.role === 'assistant2' ? 'Juez de Línea 2' : 
                       'Cuarto Árbitro'}:
                    </span>
                    {' '}{ref.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Team Rosters */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">{homeTeam?.name}</h3>
              <div className="space-y-1 text-sm">
                {homeTeamRoster.map(player => (
                  <Link
                    key={player.id}
                    to={`/players/${player.id}`}
                    className="block hover:bg-gray-50 p-1 rounded"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="font-medium">{player.number}</span>{' '}
                    {player.firstName} {player.lastName}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{awayTeam?.name}</h3>
              <div className="space-y-1 text-sm">
                {awayTeamRoster.map(player => (
                  <Link
                    key={player.id}
                    to={`/players/${player.id}`}
                    className="block hover:bg-gray-50 p-1 rounded"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="font-medium">{player.number}</span>{' '}
                    {player.firstName} {player.lastName}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Match Events */}
          {match.matchEvents && match.matchEvents.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Timeline del Partido</h3>
              <div className="space-y-2">
                {match.matchEvents
                  .sort((a, b) => a.minute - b.minute)
                  .map((event) => (
                    <div key={event.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                      <span className="text-xl">
                        {event.eventType === 'try' ? '🏉' :
                         event.eventType === 'conversion' ? '🎯' :
                         event.eventType === 'penalty' ? '🥅' :
                         event.eventType === 'yellow_card' ? '🟨' :
                         event.eventType === 'red_card' ? '🟥' : '📝'}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium">
                          {event.eventType === 'try' && 'Ensayo de '}
                          {event.eventType === 'conversion' && 'Transformación de '}
                          {event.eventType === 'penalty' && 'Golpe de castigo de '}
                          {event.eventType === 'yellow_card' && 'Tarjeta amarilla para '}
                          {event.eventType === 'red_card' && 'Tarjeta roja para '}
                          {event.playerId && (
                            <Link 
                              to={`/players/${event.playerId}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {getPlayerName(event.playerId)}
                            </Link>
                          )}
                        </p>
                        {event.details && (
                          <p className="text-sm text-gray-500">{event.details}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">{event.minute}'</span>
                        {event.points && (
                          <p className="text-xs text-gray-500">+{event.points} pts</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cerrar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MatchDetails;