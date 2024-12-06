import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Player } from '../../../types';
import { teams } from '../../../data/teams';

interface PlayerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (player: Partial<Player>) => void;
  initialData?: Player;
}

const PlayerForm = ({ isOpen, onClose, onSubmit, initialData }: PlayerFormProps) => {
  const [formData, setFormData] = useState<Partial<Player>>(
    initialData || {
      firstName: '',
      lastName: '',
      nickname: '',
      position: '',
      number: 0,
      height: 0,
      weight: 0,
      birthDate: '',
      licenseNumber: '',
      status: 'active',
      teamId: 0,
      clubId: 0
    }
  );

  const positions = [
    'Pilar',
    'Talonador',
    'Segunda Línea',
    'Tercera Línea',
    'Medio Melé',
    'Apertura',
    'Centro',
    'Ala',
    'Zaguero'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-xl font-bold mb-4">
            {initialData ? 'Editar Jugador' : 'Nuevo Jugador'}
          </Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.firstName || ''}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Apellidos</label>
                <input
                  type="text"
                  value={formData.lastName || ''}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Apodo</label>
              <input
                type="text"
                value={formData.nickname || ''}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Equipo</label>
              <select
                value={formData.teamId || ''}
                onChange={(e) => {
                  const team = teams.find(t => t.id === Number(e.target.value));
                  setFormData({
                    ...formData,
                    teamId: Number(e.target.value),
                    clubId: team?.clubId || 0
                  });
                }}
                className="w-full border rounded-lg p-2"
                required
              >
                <option value="">Seleccionar equipo</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Posición</label>
                <select
                  value={formData.position || ''}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Seleccionar posición</option>
                  {positions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Número</label>
                <input
                  type="number"
                  value={formData.number || ''}
                  onChange={(e) => setFormData({ ...formData, number: Number(e.target.value) })}
                  className="w-full border rounded-lg p-2"
                  min="1"
                  max="99"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Altura (cm)</label>
                <input
                  type="number"
                  value={formData.height || ''}
                  onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Peso (kg)</label>
                <input
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha de Nacimiento</label>
              <input
                type="date"
                value={formData.birthDate ? new Date(formData.birthDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Número de Licencia</label>
              <input
                type="text"
                value={formData.licenseNumber || ''}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                value={formData.status || 'active'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Player['status'] })}
                className="w-full border rounded-lg p-2"
              >
                <option value="active">Activo</option>
                <option value="injured">Lesionado</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
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
                {initialData ? 'Guardar Cambios' : 'Crear Jugador'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PlayerForm;