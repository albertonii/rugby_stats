import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { User } from '../../../types';

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<User>) => void;
  initialData?: User;
}

const UserForm = ({ isOpen, onClose, onSubmit, initialData }: UserFormProps) => {
  const [formData, setFormData] = useState<Partial<User>>(
    initialData || {
      name: '',
      email: '',
      role: 'Delegado',
      status: 'active',
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
            {initialData ? 'Editar Usuario' : 'Nuevo Usuario'}
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
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Rol</label>
              <select
                value={formData.role || 'Delegado'}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                className="w-full border rounded-lg p-2"
              >
                <option value="Admin">Administrador</option>
                <option value="Delegado">Delegado</option>
                <option value="Staff">Staff</option>
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
                {initialData ? 'Guardar Cambios' : 'Crear Usuario'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UserForm;