import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Team } from '../../../types';
import { players } from '../../../data/players';
import { clubs } from '../../../data/clubs';

interface TeamFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (team: Partial<Team>) => void;
  initialData?: Team;
}

const TeamForm = ({ isOpen, onClose, onSubmit, initialData }: TeamFormProps) => {
  const [formData, setFormData] = useState<Partial<Team>>(
    initialData || {
      name: '',
      category: 'Senior Masculino',
      season: '2023/2024',
      status: 'active',
      clubId: 0,
      homeField: '',
      players: [],
      delegates: []
    }
  );

  const [selectedPlayers, setSelectedPlayers] = useState<number[]>(
    initialData?.players || []
  );

  const availablePlayers = players.filter(
    player => !player.teamId || player.teamId === initialData?.id
  );

  const handlePlayerToggle = (playerId: number) => {
    setSelectedPlayers(prev =>
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
    setFormData(prev => ({
      ...prev,
      players: selectedPlayers
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      players: selectedPlayers
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-xl font-bold mb-4">
            {initialData ? 'Editar Equipo' : 'Nuevo Equipo'}
          </Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Club</label>
                <select
                  value={formData.clubId || ''}
                  onChange={(e) => setFormData({ ...formData, clubId: Number(e.target.value) })}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Seleccionar club</option>
                  {clubs.map(club => (
                    <option key={club.id} value={club.id}>{club.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="Senior Masculino">Senior Masculino</option>
                  <option value="Senior Femenino">Senior Femenino</option>
                  <option value="Sub-18">Sub-18</option>
                  <option value="Sub-16">Sub-16</option>
                  <option value="Rugby 7s">Rugby 7s</option>
                  <option value="Rugby Playa">Rugby Playa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Temporada</label>
                <input
                  type="text"
                  value={formData.season || ''}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Campo Local</label>
              <input
                type="text"
                value={formData.homeField || ''}
                onChange={(e) => setFormData({ ...formData, homeField: e.target.value })}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                value={formData.status || 'active'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Team['status'] })}
                className="w-full border rounded-lg p-2"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Jugadores</h3>
              <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                <div className="space-y-2">
                  {availablePlayers.map(player => (
                    <label key={player.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedPlayers.includes(player.id)}
                        onChange={() => handlePlayerToggle(player.id)}
                        className="rounded border-gray-300"
                      />
                      <span>
                        {player.firstName} {player.lastName} - {player.position}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {initialData ? 'Guardar Cambios' : 'Crear Equipo'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TeamForm;