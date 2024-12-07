import { useState } from "react";
import { Link } from "react-router-dom";
import { Team } from "../../../types";
import { teams } from "../../../data/teams";
import { clubs } from "../../../data/clubs";
import { players } from "../../../data/players";
import TeamForm from "./TeamForm";
import DeleteConfirmation from "../common/DeleteConfirmation";
import { exportToExcel, exportToPDF } from "../../../utils/export";

const TeamsList = () => {
  const [teamsList, setTeamsList] = useState<Team[]>(teams);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterClub, setFilterClub] = useState("");

  const getClubName = (clubId: number) => {
    const club = clubs.find((c) => c.id === clubId);
    return club ? club.name : "N/A";
  };

  const getTeamPlayers = (teamId: number) => {
    return players.filter((p) => p.teamId === teamId);
  };

  const handleCreateTeam = (teamData: Partial<Team>) => {
    const newTeam = {
      ...teamData,
      id: Math.max(...teamsList.map((t) => t.id)) + 1,
    } as Team;
    setTeamsList([...teamsList, newTeam]);
  };

  const handleEditTeam = (teamData: Partial<Team>) => {
    setTeamsList(
      teamsList.map((team) =>
        team.id === selectedTeam?.id ? { ...team, ...teamData } : team
      )
    );
  };

  const handleDeleteTeam = () => {
    if (selectedTeam) {
      setTeamsList(teamsList.filter((team) => team.id !== selectedTeam.id));
      setIsDeleteOpen(false);
      setSelectedTeam(null);
    }
  };

  const handleExportExcel = () => {
    exportToExcel(teamsList, "equipos");
  };

  const handleExportPDF = () => {
    const columns = ["name", "category", "season", "status"];
    exportToPDF(teamsList, columns, "equipos");
  };

  const filteredTeams = teamsList.filter((team) => {
    const matchesCategory = !filterCategory || team.category === filterCategory;
    const matchesClub = !filterClub || team.clubId.toString() === filterClub;
    return matchesCategory && matchesClub;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Equipos</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Volver al inicio
          </Link>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button
            onClick={() => exportToExcel(teamsList, "equipos")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Exportar Excel
          </button>
          <button
            onClick={() =>
              exportToPDF(teamsList, ["name", "category", "season"], "equipos")
            }
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Exportar PDF
          </button>
          <button
            onClick={() => {
              setSelectedTeam(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Nuevo Equipo
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg">
          <option value="">Todas las categorías</option>
          <option value="Senior Masculino">Senior Masculino</option>
          <option value="Senior Femenino">Senior Femenino</option>
          <option value="Sub-18">Sub-18</option>
          <option value="Sub-16">Sub-16</option>
          <option value="Rugby 7s">Rugby 7s</option>
          <option value="Rugby Playa">Rugby Playa</option>
        </select>
        <select
          value={filterClub}
          onChange={(e) => setFilterClub(e.target.value)}
          className="px-4 py-2 border rounded-lg">
          <option value="">Todos los clubes</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredTeams.map((team) => {
          const teamPlayers = getTeamPlayers(team.id);
          return (
            <div
              key={team.id}
              className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-2 sm:p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{team.name}</h3>
                    <p className="text-gray-500">{getClubName(team.clubId)}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      team.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {team.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>

              <div className="p-2 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
                  <h4 className="font-semibold mb-2">Información</h4>
                  <p className="text-sm text-gray-600">
                    Categoría: {team.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    Temporada: {team.season}
                  </p>
                  <p className="text-sm text-gray-600">
                    Jugadores: {teamPlayers.length}
                  </p>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Link
                    to={`/teams/${team.id}`}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                    Ver Detalles
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedTeam(team);
                      setIsFormOpen(true);
                    }}
                    className="px-4 py-2 text-blue-600 hover:text-blue-800">
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTeam(team);
                      setIsDeleteOpen(true);
                    }}
                    className="px-4 py-2 text-red-600 hover:text-red-800">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <TeamForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedTeam(null);
        }}
        onSubmit={selectedTeam ? handleEditTeam : handleCreateTeam}
        initialData={selectedTeam || undefined}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedTeam(null);
        }}
        onConfirm={handleDeleteTeam}
        title="Eliminar Equipo"
        message={`¿Estás seguro de que deseas eliminar el equipo ${selectedTeam?.name}?`}
      />
    </div>
  );
};

export default TeamsList;
