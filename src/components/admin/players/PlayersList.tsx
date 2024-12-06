import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../../../types';
import PlayerForm from './PlayerForm';
import DeleteConfirmation from '../common/DeleteConfirmation';
import { players } from '../../../data/players';
import { teams } from '../../../data/teams';
import { exportToExcel, exportToPDF } from '../../../utils/export';

const PlayersList = () => {
  const [playersList, setPlayersList] = useState<Player[]>(players);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const getTeamName = (teamId: number) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : 'N/A';
  };

  const handleCreatePlayer = (playerData: Partial<Player>) => {
    const newPlayer = {
      ...playerData,
      id: Math.max(...playersList.map(p => p.id)) + 1,
    } as Player;
    setPlayersList([...playersList, newPlayer]);
  };

  const handleEditPlayer = (playerData: Partial<Player>) => {
    setPlayersList(playersList.map(player => 
      player.id === selectedPlayer?.id ? { ...player, ...playerData } : player
    ));
  };

  const handleDeletePlayer = () => {
    if (selectedPlayer) {
      setPlayersList(playersList.filter(player => player.id !== selectedPlayer.id));
      setIsDeleteOpen(false);
      setSelectedPlayer(null);
    }
  };

  const handleExportExcel = () => {
    exportToExcel(playersList, 'jugadores');
  };

  const handleExportPDF = () => {
    const columns = ['firstName', 'lastName', 'position', 'number', 'status'];
    exportToPDF(playersList, columns, 'jugadores');
  };

  const filteredPlayers = playersList.filter(player => {
    const matchesCategory = !filterCategory || teams.find(t => t.id === player.teamId)?.category === filterCategory;
    const matchesTeam = !filterTeam || player.teamId.toString() === filterTeam;
    const matchesSearch = !searchTerm || 
      `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesTeam && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Jugadores</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Volver al inicio
          </Link>
        </div>
        <div className="space-x-2">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Exportar Excel
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Exportar PDF
          </button>
          <button
            onClick={() => {
              setSelectedPlayer(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Nuevo Jugador
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Buscar jugador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Todas las categorías</option>
          <option value="Senior Masculino">Senior Masculino</option>
          <option value="Senior Femenino">Senior Femenino</option>
          <option value="Sub-18">Sub-18</option>
          <option value="Sub-16">Sub-16</option>
        </select>
        <select
          value={filterTeam}
          onChange={(e) => setFilterTeam(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Todos los equipos</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>

      {/* Tabla de Jugadores */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jugador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posición
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Número
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPlayers.map((player) => (
              <tr key={player.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {player.firstName} {player.lastName}
                  </div>
                  {player.nickname && (
                    <div className="text-sm text-gray-500">
                      "{player.nickname}"
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {getTeamName(player.teamId)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{player.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{player.number}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedPlayer(player);
                      setIsFormOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPlayer(player);
                      setIsDeleteOpen(true);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PlayerForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedPlayer(null);
        }}
        onSubmit={selectedPlayer ? handleEditPlayer : handleCreatePlayer}
        initialData={selectedPlayer || undefined}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedPlayer(null);
        }}
        onConfirm={handleDeletePlayer}
        title="Eliminar Jugador"
        message={`¿Estás seguro de que deseas eliminar al jugador ${selectedPlayer?.firstName} ${selectedPlayer?.lastName}?`}
      />
    </div>
  );
};

export default PlayersList;