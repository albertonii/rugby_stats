import { useParams, Link } from 'react-router-dom';
import { matches } from '../../data/matches';
import { teams } from '../../data/teams';
import { players } from '../../data/players';
import { competitions } from '../../data/competitions';
import { ArrowLeftIcon, TrophyIcon } from '@heroicons/react/24/outline';

const MatchView = () => {
  const { matchId } = useParams();
  const match = matches.find(m => m.id === Number(matchId));

  if (!match) return <div>Partido no encontrado</div>;

  const homeTeam = teams.find(t => t.id === match.homeTeamId);
  const awayTeam = teams.find(t => t.id === match.awayTeamId);
  const competition = competitions.find(c => c.matches.includes(match.id));

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link to="/matches" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Volver a partidos
        </Link>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          match.status === 'completed'
            ? 'bg-green-100 text-green-800'
            : match.status === 'in_progress'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {match.status === 'completed' ? 'Finalizado' :
           match.status === 'in_progress' ? 'En juego' : 'Programado'}
        </span>
      </div>

      {/* Competition Reference */}
      {competition && (
        <Link 
          to={`/competitions/${competition.id}`}
          className="block bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <TrophyIcon className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">{competition.name}</p>
              <p className="text-sm text-blue-600">{competition.season}</p>
            </div>
          </div>
        </Link>
      )}

      {/* Match Info */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">{match.round}</p>
          <p className="text-sm text-gray-500">
            {new Date(match.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h2 className="text-xl font-bold mb-2">{homeTeam?.name}</h2>
            <p className="text-4xl font-bold">{match.homeScore || 0}</p>
          </div>
          <div className="text-center px-4">
            <p className="text-xl font-bold">VS</p>
            <p className="text-sm text-gray-500">
              {new Date(match.date).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="text-center flex-1">
            <h2 className="text-xl font-bold mb-2">{awayTeam?.name}</h2>
            <p className="text-4xl font-bold">{match.awayScore || 0}</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">{match.venue}</p>
        </div>
      </div>

      {/* Referee Information */}
      {match.referee && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Equipo Arbitral</h3>
          <div className="space-y-2">
            {match.referee.map((ref, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <span className="font-medium">
                  {ref.role === 'main' ? 'Árbitro Principal' :
                   ref.role === 'assistant1' ? 'Juez de Línea 1' :
                   ref.role === 'assistant2' ? 'Juez de Línea 2' : 
                   'Cuarto Árbitro'}
                </span>
                <span>{ref.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Rosters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Home Team */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">{homeTeam?.name}</h3>
          <div className="space-y-2">
            {homeTeamRoster.map(player => (
              <Link
                key={player.id}
                to={`/players/${player.id}`}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
              >
                <span className="font-medium">#{player.number}</span>
                <span>{player.firstName} {player.lastName}</span>
                <span className="text-gray-500">{player.position}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Away Team */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">{awayTeam?.name}</h3>
          <div className="space-y-2">
            {awayTeamRoster.map(player => (
              <Link
                key={player.id}
                to={`/players/${player.id}`}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
              >
                <span className="font-medium">#{player.number}</span>
                <span>{player.firstName} {player.lastName}</span>
                <span className="text-gray-500">{player.position}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Match Events */}
      {match.matchEvents && match.matchEvents.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Timeline del Partido</h3>
          <div className="space-y-4">
            {match.matchEvents
              .sort((a, b) => a.minute - b.minute)
              .map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                  <span className="text-2xl">
                    {event.eventType === 'try' ? '🏉' :
                     event.eventType === 'conversion' ? '🎯' :
                     event.eventType === 'penalty' ? '🥅' :
                     event.eventType === 'yellow_card' ? '🟨' :
                     event.eventType === 'red_card' ? '🟥' : '📝'}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">
                      {event.eventType === 'try' && 'Ensayo de '}
                      {event.eventType === 'conversion' && 'Transformación de '}
                      {event.eventType === 'penalty' && 'Golpe de castigo de '}
                      {event.eventType === 'yellow_card' && 'Tarjeta amarilla para '}
                      {event.eventType === 'red_card' && 'Tarjeta roja para '}
                      {event.playerId && (
                        <Link 
                          to={`/players/${event.playerId}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {getPlayerName(event.playerId)}
                        </Link>
                      )}
                    </div>
                    {event.details && (
                      <p className="text-sm text-gray-500">{event.details}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{event.minute}'</p>
                    {event.points && <p className="text-sm text-gray-500">+{event.points} pts</p>}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchView;