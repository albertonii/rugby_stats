import { Competition } from '../types';

export const competitions: Competition[] = [
  // Liga Canaria Senior Masculino
  {
    id: 1,
    name: 'Liga Canaria Senior Masculino',
    season: '2023/2024',
    category: 'Senior Masculino',
    startDate: new Date('2023-09-15'),
    endDate: new Date('2024-05-30'),
    status: 'active',
    format: 'league',
    description: 'Liga regular con sistema de puntos. Todos contra todos a ida y vuelta.',
    pointSystem: {
      win: 4,
      draw: 2,
      loss: 0,
      tryBonus: 1,
      lossBonus: 1
    },
    teams: [1, 4, 6, 8, 10, 12], // CRLP, CRULL, Mahoh, Lanzarote, Ñandú, Boatmen
    matches: [1, 2, 3, 4, 5, 6] // IDs de los partidos vinculados
  },

  // Liga Canaria Senior Femenino
  {
    id: 2,
    name: 'Liga Canaria Senior Femenino',
    season: '2023/2024',
    category: 'Senior Femenino',
    startDate: new Date('2023-09-22'),
    endDate: new Date('2024-05-15'),
    status: 'active',
    format: 'league',
    description: 'Liga regular femenina con sistema de puntos.',
    pointSystem: {
      win: 4,
      draw: 2,
      loss: 0,
      tryBonus: 1,
      lossBonus: 1
    },
    teams: [2, 5, 9, 13], // CRLP, CRULL, Lanzarote, Boatmen
    matches: [7, 8, 9, 10] // IDs de los partidos vinculados
  },

  // Torneo Rugby 7s Sub-16
  {
    id: 3,
    name: 'Torneo Rugby 7s Sub-16',
    season: '2023/2024',
    category: 'Sub-16',
    startDate: new Date('2024-02-10'),
    endDate: new Date('2024-02-10'),
    status: 'upcoming',
    format: 'tournament',
    description: 'Torneo de un día de Rugby 7s para categoría Sub-16.',
    structure: {
      groups: [
        {
          name: 'Grupo A',
          teams: [3, 7], // CRLP, Mahoh
          matches: []
        },
        {
          name: 'Grupo B',
          teams: [11], // Ñandú
          matches: []
        }
      ],
      knockout: {
        semifinals: [],
        final: []
      }
    },
    teams: [3, 7, 11], // CRLP, Mahoh, Ñandú
    matches: []
  }
];