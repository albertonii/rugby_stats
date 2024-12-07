import { useState } from "react";
import { Link } from "react-router-dom";
import { Competition } from "../../../types";
import CompetitionForm from "./CompetitionForm";
import CompetitionDetails from "./CompetitionDetails";
import DeleteConfirmation from "../common/DeleteConfirmation";
import { exportToExcel, exportToPDF } from "../../../utils/export";

const CompetitionsList = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([
    {
      id: 1,
      name: "Liga Canaria Senior Masculino",
      season: "2023/2024",
      category: "Senior Masculino",
      startDate: new Date("2023-09-15"),
      endDate: new Date("2024-05-30"),
      status: "active",
      teams: [],
      matches: [],
      format: "league",
      description: "",
    },
    {
      id: 2,
      name: "Copa Canaria Senior Femenino",
      season: "2023/2024",
      category: "Senior Femenino",
      startDate: new Date("2023-10-01"),
      endDate: new Date("2024-04-30"),
      status: "active",
      teams: [],
      matches: [],
      format: "league",
      description: "",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] =
    useState<Competition | null>(null);
  const [filterCategory, setFilterCategory] = useState("");

  const handleCreateCompetition = (competitionData: Partial<Competition>) => {
    const newCompetition = {
      ...competitionData,
      id: competitions.length + 1,
      teams: [],
      matches: [],
    } as Competition;
    setCompetitions([...competitions, newCompetition]);
  };

  const handleEditCompetition = (competitionData: Partial<Competition>) => {
    setCompetitions(
      competitions.map((competition) =>
        competition.id === selectedCompetition?.id
          ? { ...competition, ...competitionData }
          : competition
      )
    );
  };

  const handleDeleteCompetition = () => {
    if (selectedCompetition) {
      setCompetitions(
        competitions.filter(
          (competition) => competition.id !== selectedCompetition.id
        )
      );
      setIsDeleteOpen(false);
      setSelectedCompetition(null);
    }
  };

  const handleExportExcel = () => {
    exportToExcel(competitions, "competiciones");
  };

  const handleExportPDF = () => {
    const columns = ["name", "season", "category", "status"];
    exportToPDF(competitions, columns, "competiciones");
  };

  const filteredCompetitions = competitions.filter(
    (competition) => !filterCategory || competition.category === filterCategory
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Competiciones</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Volver al inicio
          </Link>
        </div>

        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
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
              setSelectedCompetition(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Nueva Competición
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border rounded-lg">
          <option value="">Todas las categorías</option>
          <option value="Senior Masculino">Senior Masculino</option>
          <option value="Senior Femenino">Senior Femenino</option>
          <option value="Sub-18">Sub-18</option>
          <option value="Sub-16">Sub-16</option>
          <option value="Rugby 7s">Rugby 7s</option>
          <option value="Rugby Playa">Rugby Playa</option>
        </select>
      </div>

      {/* Lista de Competiciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompetitions.map((competition) => (
          <div key={competition.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{competition.name}</h3>
                <p className="text-sm text-gray-500">{competition.season}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
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
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>Categoría: {competition.category}</p>
              <p>Inicio: {competition.startDate.toLocaleDateString()}</p>
              <p>Fin: {competition.endDate.toLocaleDateString()}</p>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setSelectedCompetition(competition);
                  setIsDetailsOpen(true);
                }}
                className="text-blue-600 hover:text-blue-800">
                Ver detalles
              </button>
              <button
                onClick={() => {
                  setSelectedCompetition(competition);
                  setIsFormOpen(true);
                }}
                className="text-blue-600 hover:text-blue-800">
                Editar
              </button>
              <button
                onClick={() => {
                  setSelectedCompetition(competition);
                  setIsDeleteOpen(true);
                }}
                className="text-red-600 hover:text-red-900">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modales */}
      <CompetitionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCompetition(null);
        }}
        onSubmit={
          selectedCompetition ? handleEditCompetition : handleCreateCompetition
        }
        initialData={selectedCompetition || undefined}
      />

      {selectedCompetition && isDetailsOpen && (
        <CompetitionDetails
          competition={selectedCompetition}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedCompetition(null);
          }}
        />
      )}

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedCompetition(null);
        }}
        onConfirm={handleDeleteCompetition}
        title="Eliminar Competición"
        message={`¿Estás seguro de que deseas eliminar la competición ${selectedCompetition?.name}?`}
      />
    </div>
  );
};

export default CompetitionsList;
