import { useState } from 'react';
import { Link } from 'react-router-dom';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    seasonYear: '2023/2024',
    matchDuration: 80,
    pointsWin: 4,
    pointsDraw: 2,
    pointsLoss: 0,
    pointsTryBonus: 1,
    pointsLossBonus: 1,
    maxYellowCardMinutes: 10,
    requirePlayerLicense: true,
    allowTeamPhotos: true,
    enablePublicStats: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings update logic
    console.log('Settings updated:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Configuración General</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Volver al inicio
          </Link>
        </div>
        <button 
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Temporada */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Temporada Actual</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Año de Temporada
                </label>
                <input
                  type="text"
                  name="seasonYear"
                  value={settings.seasonYear}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Configuración de Partidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Configuración de Partidos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duración del Partido (minutos)
                </label>
                <input
                  type="number"
                  name="matchDuration"
                  value={settings.matchDuration}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tiempo Tarjeta Amarilla (minutos)
                </label>
                <input
                  type="number"
                  name="maxYellowCardMinutes"
                  value={settings.maxYellowCardMinutes}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Sistema de Puntuación */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sistema de Puntuación</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Puntos por Victoria
                </label>
                <input
                  type="number"
                  name="pointsWin"
                  value={settings.pointsWin}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Puntos por Empate
                </label>
                <input
                  type="number"
                  name="pointsDraw"
                  value={settings.pointsDraw}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Puntos por Derrota
                </label>
                <input
                  type="number"
                  name="pointsLoss"
                  value={settings.pointsLoss}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Punto Bonus Ensayos
                </label>
                <input
                  type="number"
                  name="pointsTryBonus"
                  value={settings.pointsTryBonus}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Punto Bonus Derrota
                </label>
                <input
                  type="number"
                  name="pointsLossBonus"
                  value={settings.pointsLossBonus}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Configuración General */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Otras Configuraciones</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="requirePlayerLicense"
                  checked={settings.requirePlayerLicense}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Requerir licencia de jugador
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="allowTeamPhotos"
                  checked={settings.allowTeamPhotos}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Permitir fotos de equipo
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="enablePublicStats"
                  checked={settings.enablePublicStats}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Habilitar estadísticas públicas
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralSettings;