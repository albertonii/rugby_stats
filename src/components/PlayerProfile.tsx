import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ChartBarIcon, ClockIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { players } from '../data/players';
import { matches } from '../data/matches';
import { teams } from '../data/teams';
import PlayerStats from './stats/PlayerStats';

const PlayerProfile = () => {
  const { playerId } = useParams();
  const player = players.find(p => p.id === Number(playerId));
  const team = teams.find(t => t.id === player?.teamId);

  if (!player) return <div>Jugador no encontrado</div>;

  const playerMatches = matches.filter(match => 
    match.matchEvents && match.matchEvents.some(event => event.playerId === player.id)
  );

  const calculateStats = () => {
    let tries = 0;
    let conversions = 0;
    let penalties = 0;
    let yellowCards = 0;
    let redCards = 0;
    let minutesPlayed = 0;
    let matchesStarted = 0;
    let matchesSubstitute = 0;

    playerMatches.forEach(match => {
      if (!match.matchEvents) return;
      
      // Calcular minutos jugados
      const substitutionOut = match.matchEvents.find(e => 
        e.eventType === 'substitution' && e.playerOutId === player.id
      );
      const substitutionIn = match.matchEvents.find(e => 
        e.eventType === 'substitution' && e.playerInId === player.id
      );

      if (substitutionIn) {
        matchesSubstitute++;
        minutesPlayed += 80 - substitutionIn.minute;
      } else {
        matchesStarted++;
        minutesPlayed += substitutionOut ? substitutionOut.minute : 80;
      }
      
      match.matchEvents.forEach(event => {
        if (event.playerId === player.id) {
          switch (event.eventType) {
            case 'try': tries++; break;
            case 'conversion': conversions++; break;
            case 'penalty': penalties++; break;
            case 'yellow_card': yellowCards++; break;
            case 'red_card': redCards++; break;
          }
        }
      });
    });

    return {
      tries,
      conversions,
      penalties,
      yellowCards,
      redCards,
      totalPoints: (tries * 5) + (conversions * 2) + (penalties * 3),
      minutesPlayed,
      matchesStarted,
      matchesSubstitute,
      totalMatches: matchesStarted + matchesSubstitute,
      averageMinutesPerMatch: Math.round(minutesPlayed / (matchesStarted + matchesSubstitute))
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Header with Navigation */}
      <div className="flex items-center space-x-4">
        <Link to="/players" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Volver a jugadores
        </Link>
      </div>

      {/* Player Info Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {player.firstName} {player.lastName}
              {player.nickname && <span className="text-gray-500 text-lg ml-2">"{player.nickname}"</span>}
            </h1>
            <p className="text-gray-600">{team?.name}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            player.status === 'active'
              ? 'bg-green-100 text-green-800'
              : player.status === 'injured'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {player.status === 'active' ? 'Activo' :
             player.status === 'injured' ? 'Lesionado' : 'Inactivo'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Información Personal</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Edad: {new Date().getFullYear() - new Date(player.birthDate).getFullYear()} años</p>
              <p>Altura: {player.height} cm</p>
              <p>Peso: {player.weight} kg</p>
              <p>IMC: {Math.round((player.weight / Math.pow(player.height/100, 2)) * 10) / 10}</p>
              <p>Licencia: {player.licenseNumber}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Información Deportiva</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Posición: {player.position}</p>
              <p>Número: {player.number}</p>
              <p>Partidos Titular: {stats.matchesStarted}</p>
              <p>Partidos Suplente: {stats.matchesSubstitute}</p>
              <p>Minutos Jugados: {stats.minutesPlayed}</p>
              <p>Media Minutos/Partido: {stats.averageMinutesPerMatch}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Estadísticas Temporada</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Ensayos: {stats.tries}</p>
              <p>Transformaciones: {stats.conversions}</p>
              <p>Golpes de Castigo: {stats.penalties}</p>
              <p>Tarjetas Amarillas: {stats.yellowCards}</p>
              <p>Tarjetas Rojas: {stats.redCards}</p>
              <p className="font-semibold">Puntos Totales: {stats.totalPoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-2">
            <TrophyIcon className="h-5 w-5 text-yellow-500 mr-2" />
            <h3 className="font-semibold">Rendimiento</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Efectividad Transformaciones</span>
              <span className="font-semibold">
                {stats.conversions > 0 
                  ? Math.round((stats.conversions / stats.tries) * 100)
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Puntos por Partido</span>
              <span className="font-semibold">
                {stats.totalMatches > 0 
                  ? Math.round((stats.totalPoints / stats.totalMatches) * 10) / 10
                  : 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-2">
            <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="font-semibold">Participación</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">% Partidos Titular</span>
              <span className="font-semibold">
                {stats.totalMatches > 0 
                  ? Math.round((stats.matchesStarted / stats.totalMatches) * 100)
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Minutos por Partido</span>
              <span className="font-semibold">{stats.averageMinutesPerMatch}'</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-2">
            <ChartBarIcon className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="font-semibold">Disciplina</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tarjetas por Partido</span>
              <span className="font-semibold">
                {stats.totalMatches > 0 
                  ? Math.round(((stats.yellowCards + stats.redCards) / stats.totalMatches) * 100) / 100
                  : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Minutos Sanción</span>
              <span className="font-semibold">
                {(stats.yellowCards * 10) + (stats.redCards * 80)}'
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Últimos Partidos</h2>
        <div className="space-y-4">
          {playerMatches.map(match => {
            const playerEvents = match.matchEvents?.filter(event => event.playerId === player.id) || [];
            return (
              <Link
                key={match.id}
                to={`/matches/${match.id}`}
                className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold">
                      {teams.find(t => t.id === match.homeTeamId)?.name} vs{' '}
                      {teams.find(t => t.id === match.awayTeamId)?.name}
                    </p>
                    <p className="text-sm text-gray-500">{match.round}</p>
                  </div>
                  {match.status === 'completed' && (
                    <div className="text-lg font-bold">
                      {match.homeScore} - {match.awayScore}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <p>Acciones destacadas:</p>
                  <ul className="list-disc list-inside">
                    {playerEvents.map((event, index) => (
                      <li key={index}>
                        {event.eventType === 'try' && 'Ensayo'}
                        {event.eventType === 'conversion' && 'Transformación'}
                        {event.eventType === 'penalty' && 'Golpe de Castigo'}
                        {event.eventType === 'yellow_card' && 'Tarjeta Amarilla'}
                        {event.eventType === 'red_card' && 'Tarjeta Roja'}
                        {' - '}{event.minute}'
                        {event.points && ` (+${event.points} pts)`}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Player Statistics */}
      <PlayerStats playerId={player.id} />
    </div>
  );
};

export default PlayerProfile;