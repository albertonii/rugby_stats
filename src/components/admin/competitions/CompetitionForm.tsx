import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Competition } from '../../../types';

interface CompetitionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (competition: Partial<Competition>) => void;
  initialData?: Competition;
}

const CompetitionForm = ({ isOpen, onClose, onSubmit, initialData }: CompetitionFormProps) => {
  const [formData, setFormData] = useState<Partial<Competition>>(
    initialData || {
      name: '',
      season: '2023/2024',
      category: 'Senior Masculino',
      startDate: new Date(),
      endDate: new Date(),
      status: 'upcoming',
      teams: [],
      matches: []
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4">
            {initialData ? 'Editar Competición' : 'Nueva Competición'}
          </Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-sm font-medium mb-1">Temporada</label>
              <input
                type="text"
                value={formData.season || ''}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            
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
              <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
              <input
                type="date"
                value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha Fin</label>
              <input
                type="date"
                value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                value={formData.status || 'upcoming'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Competition['status'] })}
                className="w-full border rounded-lg p-2"
              >
                <option value="upcoming">Próximamente</option>
                <option value="active">En curso</option>
                <option value="completed">Finalizado</option>
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
                {initialData ? 'Guardar Cambios' : 'Crear Competición'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CompetitionForm;