import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { matches } from '../../data/matches';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PlayerStatsProps {
  playerId: number;
}

const PlayerStats = ({ playerId }: PlayerStatsProps) => {
  const [timeRange, setTimeRange] = useState('season');

  const getPlayerEvents = () => {
    return matches
      .filter(match => match.matchEvents)
      .flatMap(match => 
        match.matchEvents.filter(event => event.playerId === playerId)
      );
  };

  const calculateStats = () => {
    const events = getPlayerEvents();
    return {
      tries: events.filter(e => e.eventType === 'try').length,
      conversions: events.filter(e => e.eventType === 'conversion').length,
      penalties: events.filter(e => e.eventType === 'penalty').length,
      yellowCards: events.filter(e => e.eventType === 'yellow_card').length,
      redCards: events.filter(e => e.eventType === 'red_card').length,
      totalPoints: events.reduce((acc, event) => acc + (event.points || 0), 0)
    };
  };

  const stats = calculateStats();

  const pointsChartData = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    datasets: [
      {
        label: 'Puntos por Mes',
        data: [10, 15, 8, 12, 20, 15],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const performanceChartData = {
    labels: ['Tries', 'Conversiones', 'Penales'],
    datasets: [
      {
        label: 'Estadísticas',
        data: [stats.tries, stats.conversions, stats.penalties],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)'
        ]
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Estadísticas</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="season">Temporada Actual</option>
          <option value="year">Último Año</option>
          <option value="all">Histórico</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Puntos</p>
          <p className="text-2xl font-bold">{stats.totalPoints}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Tries</p>
          <p className="text-2xl font-bold">{stats.tries}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Conversiones</p>
          <p className="text-2xl font-bold">{stats.conversions}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Evolución de Puntos</h3>
          <Line data={pointsChartData} />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Rendimiento</h3>
          <Bar data={performanceChartData} />
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;