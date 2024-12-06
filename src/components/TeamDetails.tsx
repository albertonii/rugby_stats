import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, UserGroupIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { teams } from '../data/teams';
import { players } from '../data/players';
import { matches } from '../data/matches';
import { clubs } from '../data/clubs';

const TeamDetails = () => {
  const { teamId } = useParams();
  const team = teams.find(t => t.id === Number(teamId));
  const club = team ? clubs.find(c => c.id === team.clubId) : null;
  const teamPlayers = players.filter(p => p.teamId === Number(teamId));
  const teamMatches = matches.filter(
    m => m.homeTeamId === Number(teamId) || m.awayTeamId === Number(teamId)
  );

  if (!team || !club) return <div>Equipo no encontrado</div>;

  const calculateTeamStats = () => {
    const completedMatches = teamMatches.filter(m => m.status === 'completed');
    let wins = 0, draws = 0, losses = 0;
    let pointsFor = 0, pointsAgainst = 0;
    let tries = 0;

    completedMatches.forEach(match => {
      const isHome = match.homeTeamId === team.id;
      const teamScore = isHome ? match.homeScore : match.awayScore;
      const opponentScore = isHome ? match.awayScore : match.homeScore;

      if (teamScore && opponentScore) {
        if (teamScore > opponentScore) wins++;
        else if (teamScore === opponentScore) draws++;
        else losses++;

        pointsFor += teamScore;
        pointsAgainst += opponentScore;
      }

      // Count tries
      if (match.matchEvents) {
        tries += match.matchEvents.filter(
          e => e.teamId === team.id && e.eventType === 'try'
        ).length;
      }
    });

    return {
      played: completedMatches.length,
      wins,
      draws,
      losses,
      pointsFor,
      pointsAgainst,
      tries,
      winPercentage: completedMatches.length > 0 
        ? Math.round((wins / completedMatches.length) * 100) 
        : 0
    };
  };

  const stats = calculateTeamStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Link 
            to={`/clubs/${club.id}`} 
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Volver a {club.name}
          </Link>
          <h1 className="text-2xl font-bold mt-2">{team.name}</h1>
          <p className="text-gray-500">{team.category} - {team.season}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          team.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {team.status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-2">
            <UserGroupIcon className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="font-semibold">Plantilla</h3>
          </div>
          <p className="text-3xl font-bold">{teamPlayers.length}</p>
          <p className="text-sm text-gray-500">Jugadores registrados</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-2">
            <TrophyIcon className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="font-semibold">Rendimiento</h3>
          </div>
          <p className="text-3xl font-bold">{stats.winPercentage}%</p>
          <p className="text-sm text-gray-500">Porcentaje de victorias</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">Partidos</h3>
          <p className="text-3xl font-bold">{stats.played}</p>
          <p className="text-sm text-gray-500">
            {stats.wins}G {stats.draws}E {stats.losses}P
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">Puntuación</h3>
          <p className="text-3xl font-bold">{stats.pointsFor}</p>
          <p className="text-sm text-gray-500">
            {stats.tries} ensayos | {stats.pointsAgainst} puntos en contra
          </p>
        </div>
      </div>

      {/* Players */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Plantilla</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Jugador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Posición
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link 
                      to={`/players/${player.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <div className="font-medium">
                        {player.firstName} {player.lastName}
                      </div>
                      {player.nickname && (
                        <div className="text-sm text-gray-500">
                          "{player.nickname}"
                        </div>
                      )}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{player.position}</td>
                  <td className="px-6 py-4">{player.number}</td>
                  <td className="px-6 py-4">
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

      {/* Recent Matches */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Últimos Partidos</h3>
        <div className="space-y-4">
          {teamMatches
            .filter(match => match.status === 'completed')
            .slice(0, 5)
            .map(match => {
              const isHome = match.homeTeamId === team.id;
              const opponent = teams.find(t => 
                t.id === (isHome ? match.awayTeamId : match.homeTeamId)
              );
              const teamScore = isHome ? match.homeScore : match.awayScore;
              const opponentScore = isHome ? match.awayScore : match.homeScore;

              return (
                <Link
                  key={match.id}
                  to={`/matches/${match.id}`}
                  className="block border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">
                        {isHome ? team.name : opponent?.name} vs{' '}
                        {isHome ? opponent?.name : team.name}
                      </p>
                      <p className="text-sm text-gray-500">{match.round}</p>
                    </div>
                    {teamScore !== undefined && opponentScore !== undefined && (
                      <div className="text-lg font-bold">
                        {teamScore} - {opponentScore}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {new Date(match.date).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;