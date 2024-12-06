import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { competitions } from '../../data/competitions';
import { teams } from '../../data/teams';
import { matches } from '../../data/matches';
import MatchList from '../matches/MatchList';

const CompetitionView = () => {
  const { competitionId } = useParams();
  const competition = competitions.find(c => c.id === Number(competitionId));

  if (!competition) return <div>Competición no encontrada</div>;

  const competitionTeams = teams.filter(team => 
    competition.teams.includes(team.id)
  );

  const competitionMatches = matches.filter(match =>
    competition.matches.includes(match.id)
  );

  const upcomingMatches = competitionMatches.filter(m => m.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const completedMatches = competitionMatches.filter(m => m.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const calculateTeamStats = (teamId: number) => {
    const teamMatches = competitionMatches.filter(match =>
      (match.homeTeamId === teamId || match.awayTeamId === teamId) &&
      match.status === 'completed'
    );

    let wins = 0, draws = 0, losses = 0, points = 0;
    let pointsFor = 0, pointsAgainst = 0;

    teamMatches.forEach(match => {
      if (!match.homeScore || !match.awayScore) return;

      const isHome = match.homeTeamId === teamId;
      const teamScore = isHome ? match.homeScore : match.awayScore;
      const opponentScore = isHome ? match.awayScore : match.homeScore;

      pointsFor += teamScore;
      pointsAgainst += opponentScore;

      if (teamScore > opponentScore) {
        wins++;
        points += 4; // Victoria
        if (match.matchEvents?.filter(e => e.teamId === teamId && e.eventType === 'try').length >= 4) {
          points += 1; // Bonus por ensayos
        }
      } else if (teamScore === opponentScore) {
        draws++;
        points += 2; // Empate
      } else {
        losses++;
        if (opponentScore - teamScore <= 7) {
          points += 1; // Bonus por derrota ajustada
        }
      }
    });

    return {
      team: teams.find(t => t.id === teamId),
      played: teamMatches.length,
      wins,
      draws,
      losses,
      pointsFor,
      pointsAgainst,
      points
    };
  };

  const standings = competitionTeams
    .map(team => calculateTeamStats(team.id))
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const bDiff = b.pointsFor - b.pointsAgainst;
      const aDiff = a.pointsFor - a.pointsAgainst;
      return bDiff - aDiff;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Link to="/competitions" className="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Volver a competiciones
          </Link>
          <h1 className="text-2xl font-bold mt-2">{competition.name}</h1>
          <p className="text-gray-600">{competition.season}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
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

      {/* Competition Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Información General</h3>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Categoría:</span> {competition.category}</p>
              <p><span className="font-medium">Inicio:</span> {competition.startDate.toLocaleDateString()}</p>
              <p><span className="font-medium">Fin:</span> {competition.endDate.toLocaleDateString()}</p>
              <p><span className="font-medium">Equipos:</span> {competitionTeams.length}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Sistema de Puntuación</h3>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Victoria:</span> 4 puntos</p>
              <p><span className="font-medium">Empate:</span> 2 puntos</p>
              <p><span className="font-medium">Bonus Ensayo:</span> 1 punto (4 o más ensayos)</p>
              <p><span className="font-medium">Bonus Derrota:</span> 1 punto (diferencia ≤ 7 puntos)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Standings */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-lg font-semibold p-6">Clasificación</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipo</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">PJ</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">G</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">E</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">P</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">PF</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">PC</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Dif</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Puntos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {standings.map((standing, index) => (
                <tr key={standing.team?.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      to={`/teams/${standing.team?.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {standing.team?.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{standing.played}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{standing.wins}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{standing.draws}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{standing.losses}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{standing.pointsFor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{standing.pointsAgainst}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {standing.pointsFor - standing.pointsAgainst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold">
                    {standing.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Próximos Partidos</h3>
          <MatchList matches={upcomingMatches} showDetails={true} />
        </div>
      )}

      {/* Completed Matches */}
      {completedMatches.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Últimos Resultados</h3>
          <MatchList matches={completedMatches} showDetails={true} />
        </div>
      )}
    </div>
  );
};

export default CompetitionView;