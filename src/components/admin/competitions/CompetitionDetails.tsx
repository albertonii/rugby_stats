import { useState } from "react";
import { Competition, Match, Team } from "../../../types";
import MatchList from "../../matches/MatchList";

interface CompetitionDetailsProps {
  competition: Competition;
  onClose: () => void;
}

const CompetitionDetails = ({
  competition,
  onClose,
}: CompetitionDetailsProps) => {
  const [selectedTeams] = useState<Team[]>(
    competition.teams as unknown as Team[]
  );

  const [matches] = useState<Match[]>(
    competition.matches as unknown as Match[]
  );

  return (
    <div className="fixed inset-0 bg-gray-100 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{competition.name}</h2>
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
            Volver
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Información General */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Información General</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Temporada:</span>{" "}
                {competition.season}
              </p>
              <p>
                <span className="font-medium">Categoría:</span>{" "}
                {competition.category}
              </p>
              <p>
                <span className="font-medium">Inicio:</span>{" "}
                {competition.startDate.toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Fin:</span>{" "}
                {competition.endDate.toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Estado:</span>
                <span
                  className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    competition.status === "active"
                      ? "bg-green-100 text-green-800"
                      : competition.status === "upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                  {competition.status === "active"
                    ? "En curso"
                    : competition.status === "upcoming"
                    ? "Próximamente"
                    : "Finalizado"}
                </span>
              </p>
            </div>
          </div>

          {/* Equipos Participantes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              Equipos Participantes
            </h3>
            <div className="space-y-2">
              {selectedTeams.map((team) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <span>{team.name}</span>
                  <button className="text-red-600 hover:text-red-800">
                    Eliminar
                  </button>
                </div>
              ))}
              <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Añadir Equipo
              </button>
            </div>
          </div>
        </div>

        {/* Calendario y Resultados */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Calendario y Resultados
          </h3>
          <MatchList matches={matches} showDetails={true} />
        </div>

        {/* Clasificación */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Clasificación</h3>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Pos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Equipo
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  PJ
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  G
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  E
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  P
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  PF
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  PC
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Puntos
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {selectedTeams.map((team, index) => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {team.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold">
                    0
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetails;
