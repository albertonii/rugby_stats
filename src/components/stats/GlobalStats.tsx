import { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const GlobalStats = () => {
  const [timeRange, setTimeRange] = useState("season");

  const seasonStats = {
    totalMatches: 156,
    totalTries: 423,
    totalPoints: 2156,
    averagePointsPerMatch: 27.8,
    mostPointsTeam: "CRLP Senior Masculino",
    mostTriesPlayer: "Carlos Rodríguez",
    mostPenaltiesPlayer: "Juan Santana",
  };

  const pointsData = {
    labels: ["Sep", "Oct", "Nov", "Dic", "Ene", "Feb"],
    datasets: [
      {
        label: "Puntos por Mes",
        data: [320, 420, 380, 450, 390, 480],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const triesDistribution = {
    labels: ["Delanteros", "Medios", "Tres Cuartos"],
    datasets: [
      {
        data: [45, 25, 30],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Estadísticas Globales</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-lg">
          <option value="season">Temporada Actual</option>
          <option value="year">Último Año</option>
          <option value="all">Histórico</option>
        </select>
      </div>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Partidos Jugados</h3>
          <p className="text-3xl font-bold">{seasonStats.totalMatches}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Ensayos Totales</h3>
          <p className="text-3xl font-bold">{seasonStats.totalTries}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Puntos Totales</h3>
          <p className="text-3xl font-bold">{seasonStats.totalPoints}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Media Puntos/Partido</h3>
          <p className="text-3xl font-bold">
            {seasonStats.averagePointsPerMatch}
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Evolución de Puntos</h3>
          <Line data={pointsData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Distribución de Ensayos</h3>
          <Doughnut data={triesDistribution} />
        </div>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Mejores Anotadores</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <div>
                <p className="font-medium">{seasonStats.mostTriesPlayer}</p>
                <p className="text-sm text-gray-500">12 ensayos</p>
              </div>
              <span className="text-xl">🏉</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <div>
                <p className="font-medium">{seasonStats.mostPenaltiesPlayer}</p>
                <p className="text-sm text-gray-500">18 golpes de castigo</p>
              </div>
              <span className="text-xl">🎯</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Equipos Más Anotadores</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <div>
                <p className="font-medium">{seasonStats.mostPointsTeam}</p>
                <p className="text-sm text-gray-500">285 puntos</p>
              </div>
              <span className="text-xl">🏆</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;
