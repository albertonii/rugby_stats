import { useState } from "react";
import { Link } from "react-router-dom";
import { clubs } from "../../../data/clubs";
import { teams } from "../../../data/teams";
import { players } from "../../../data/players";
import ClubForm from "./ClubForm";
import DeleteConfirmation from "../common/DeleteConfirmation";
import { exportToExcel, exportToPDF } from "../../../utils/export";

const ClubsList = () => {
  const [clubsList, setClubsList] = useState(clubs);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState<(typeof clubs)[0] | null>(
    null
  );
  const [filterIsland, setFilterIsland] = useState("");

  const islands = ["Gran Canaria", "Tenerife", "Lanzarote", "Fuerteventura"];

  const handleCreateClub = (clubData: Partial<(typeof clubs)[0]>) => {
    const newClub = {
      ...clubData,
      id: Math.max(...clubsList.map((c) => c.id)) + 1,
      teams: [],
      staff: [],
      name: clubData.name || "",
      shortName: clubData.shortName || "",
      city: clubData.city || "",
      island: clubData.island || "",
      foundedYear: clubData.foundedYear || 0,
      mainField: clubData.mainField || "",
      description: clubData.description || "",
      contact: {
        email: clubData.contact?.email || "",
        phone: clubData.contact?.phone || "",
        address: clubData.contact?.address || "",
      },
      boardMembers: clubData.boardMembers || [],
    };
    setClubsList([...clubsList, newClub]);
  };

  const handleEditClub = (clubData: Partial<(typeof clubs)[0]>) => {
    setClubsList(
      clubsList.map((club) =>
        club.id === selectedClub?.id ? { ...club, ...clubData } : club
      )
    );
  };

  const handleDeleteClub = () => {
    if (selectedClub) {
      setClubsList(clubsList.filter((club) => club.id !== selectedClub.id));
      setIsDeleteOpen(false);
      setSelectedClub(null);
    }
  };

  const handleExportExcel = () => {
    exportToExcel(clubsList, "clubes");
  };

  const handleExportPDF = () => {
    const columns = ["name", "city", "island", "foundedYear"];
    exportToPDF(clubsList, columns, "clubes");
  };

  const getClubStats = (clubId: number) => {
    const clubTeams = teams.filter((t) => t.clubId === clubId);
    const clubPlayers = players.filter((p) => p.clubId === clubId);
    return {
      teams: clubTeams.length,
      players: clubPlayers.length,
    };
  };

  const filteredClubs = clubsList.filter(
    (club) => !filterIsland || club.island === filterIsland
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Clubes</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Volver al inicio
          </Link>
        </div>
        <div className="space-x-2">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Exportar Excel
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Exportar PDF
          </button>
          <button
            onClick={() => {
              setSelectedClub(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Nuevo Club
          </button>
        </div>
      </div>

      <div>
        <select
          value={filterIsland}
          onChange={(e) => setFilterIsland(e.target.value)}
          className="px-4 py-2 border rounded-lg">
          <option value="">Todas las islas</option>
          {islands.map((island) => (
            <option key={island} value={island}>
              {island}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {filteredClubs.map((club) => {
          const stats = getClubStats(club.id);
          return (
            <div
              key={club.id}
              className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{club.name}</h3>
                    <p className="text-gray-500">
                      {club.city}, {club.island}
                    </p>
                  </div>
                  {club.logo && (
                    <img
                      src={club.logo}
                      alt={`${club.name} logo`}
                      className="h-16 w-16 object-contain"
                    />
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Información</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Fundado en: {club.foundedYear}</p>
                      <p>Campo Principal: {club.mainField}</p>
                      <p>Equipos: {stats.teams}</p>
                      <p>Jugadores: {stats.players}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Contacto</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Email: {club.contact.email}</p>
                      <p>Teléfono: {club.contact.phone}</p>
                      <p>Web: {club.website}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Link
                    to={`/admin/clubs/${club.id}/teams`}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                    Gestionar Equipos
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedClub(club);
                      setIsFormOpen(true);
                    }}
                    className="px-4 py-2 text-blue-600 hover:text-blue-800">
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setSelectedClub(club);
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

      <ClubForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedClub(null);
        }}
        onSubmit={selectedClub ? handleEditClub : handleCreateClub}
        initialData={selectedClub || undefined}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedClub(null);
        }}
        onConfirm={handleDeleteClub}
        title="Eliminar Club"
        message={`¿Estás seguro de que deseas eliminar el club ${selectedClub?.name}?`}
      />
    </div>
  );
};

export default ClubsList;
