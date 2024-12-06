import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface ClubFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clubData: any) => void;
  initialData?: any;
}

const ClubForm = ({ isOpen, onClose, onSubmit, initialData }: ClubFormProps) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      shortName: '',
      city: '',
      island: '',
      foundedYear: new Date().getFullYear(),
      mainField: '',
      website: '',
      description: '',
      history: '',
      contact: {
        email: '',
        phone: '',
        address: ''
      },
      socialMedia: {
        instagram: '',
        facebook: '',
        tiktok: ''
      },
      boardMembers: [
        {
          position: 'Presidente',
          name: '',
          email: '',
          since: new Date().getFullYear().toString()
        }
      ]
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
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-xl font-bold mb-4">
            {initialData ? 'Editar Club' : 'Nuevo Club'}
          </Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Básica */}
            <div>
              <h3 className="font-semibold mb-4">Información Básica</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre Corto</label>
                  <input
                    type="text"
                    value={formData.shortName}
                    onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <h3 className="font-semibold mb-4">Ubicación</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ciudad</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Isla</label>
                  <select
                    value={formData.island}
                    onChange={(e) => setFormData({ ...formData, island: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    required
                  >
                    <option value="">Seleccionar isla</option>
                    <option value="Gran Canaria">Gran Canaria</option>
                    <option value="Tenerife">Tenerife</option>
                    <option value="Lanzarote">Lanzarote</option>
                    <option value="Fuerteventura">Fuerteventura</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Información Adicional */}
            <div>
              <h3 className="font-semibold mb-4">Información Adicional</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Año de Fundación</label>
                  <input
                    type="number"
                    value={formData.foundedYear}
                    onChange={(e) => setFormData({ ...formData, foundedYear: parseInt(e.target.value) })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Campo Principal</label>
                  <input
                    type="text"
                    value={formData.mainField}
                    onChange={(e) => setFormData({ ...formData, mainField: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value }
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value }
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dirección</label>
                  <input
                    type="text"
                    value={formData.contact.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, address: e.target.value }
                    })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div>
              <h3 className="font-semibold mb-4">Redes Sociales</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Instagram</label>
                  <input
                    type="text"
                    value={formData.socialMedia.instagram}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, instagram: e.target.value }
                    })}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Facebook</label>
                  <input
                    type="text"
                    value={formData.socialMedia.facebook}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, facebook: e.target.value }
                    })}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">TikTok</label>
                  <input
                    type="text"
                    value={formData.socialMedia.tiktok}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, tiktok: e.target.value }
                    })}
                    className="w-full border rounded-lg p-2"
                  />
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
                {initialData ? 'Guardar Cambios' : 'Crear Club'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ClubForm;
