import { Match } from '../types';

export const matches: Match[] = [
  // Liga Canaria Senior Masculino - Jornada 1
  {
    id: 1,
    competitionId: 1,
    homeTeamId: 1, // CRLP
    awayTeamId: 4, // CRULL
    date: "2023-12-16T16:00:00",
    venue: "Campo de Rugby Juan Rojas",
    category: "Senior Masculino",
    status: "completed",
    round: "Jornada 1",
    homeScore: 25,
    awayScore: 20,
    referee: [
      {
        id: 101,
        name: "Francisco Martín",
        role: "main"
      }
    ],
    roster: {
      homeTeam: [1, 2, 3, 4, 5],
      awayTeam: [20, 21, 22, 23, 24]
    },
    matchEvents: [
      {
        id: 1,
        matchId: 1,
        eventType: "try",
        minute: 15,
        playerId: 1,
        teamId: 1,
        points: 5,
        details: "Try espectacular tras una gran jugada colectiva"
      },
      {
        id: 2,
        matchId: 1,
        eventType: "conversion",
        minute: 16,
        playerId: 2,
        teamId: 1,
        points: 2,
        details: "Conversión exitosa"
      }
    ]
  },
  {
    id: 2,
    competitionId: 1,
    homeTeamId: 6, // Mahoh
    awayTeamId: 8, // Lanzarote
    date: "2023-12-16T17:00:00",
    venue: "Campo Municipal Puerto del Rosario",
    category: "Senior Masculino",
    status: "completed",
    round: "Jornada 1",
    homeScore: 18,
    awayScore: 22,
    referee: [
      {
        id: 102,
        name: "Antonio Pérez",
        role: "main"
      }
    ],
    roster: {
      homeTeam: [30, 31, 32, 33, 34],
      awayTeam: [40, 41, 42, 43, 44]
    },
    matchEvents: [
      {
        id: 3,
        matchId: 2,
        eventType: "try",
        minute: 25,
        playerId: 40,
        teamId: 8,
        points: 5,
        details: "Try de contraataque"
      }
    ]
  },

  // Liga Canaria Senior Masculino - Próximos partidos
  {
    id: 3,
    competitionId: 1,
    homeTeamId: 10, // Ñandú
    awayTeamId: 12, // Boatmen
    date: "2024-01-13T16:00:00",
    venue: "Campo Municipal de Adeje",
    category: "Senior Masculino",
    status: "scheduled",
    round: "Jornada 2",
    referee: [
      {
        id: 103,
        name: "María López",
        role: "main"
      }
    ],
    roster: {
      homeTeam: [50, 51, 52, 53, 54],
      awayTeam: [60, 61, 62, 63, 64]
    },
    matchEvents: []
  },

  // Liga Canaria Senior Femenino - Jornada 1
  {
    id: 7,
    competitionId: 2,
    homeTeamId: 2, // CRLP Femenino
    awayTeamId: 5, // CRULL Femenino
    date: "2023-12-17T12:00:00",
    venue: "Campo de Rugby Juan Rojas",
    category: "Senior Femenino",
    status: "completed",
    round: "Jornada 1",
    homeScore: 27,
    awayScore: 15,
    referee: [
      {
        id: 104,
        name: "Laura González",
        role: "main"
      }
    ],
    roster: {
      homeTeam: [10, 11, 12, 13, 14],
      awayTeam: [25, 26, 27, 28, 29]
    },
    matchEvents: [
      {
        id: 4,
        matchId: 7,
        eventType: "try",
        minute: 22,
        playerId: 10,
        teamId: 2,
        points: 5,
        details: "Try tras una gran jugada individual"
      }
    ]
  },

  // Liga Canaria Senior Femenino - Próximos partidos
  {
    id: 8,
    competitionId: 2,
    homeTeamId: 9, // Lanzarote Femenino
    awayTeamId: 13, // Boatmen Femenino
    date: "2024-01-14T16:00:00",
    venue: "Ciudad Deportiva Lanzarote",
    category: "Senior Femenino",
    status: "scheduled",
    round: "Jornada 2",
    referee: [
      {
        id: 105,
        name: "Carmen Rodríguez",
        role: "main"
      }
    ],
    roster: {
      homeTeam: [45, 46, 47, 48, 49],
      awayTeam: [65, 66, 67, 68, 69]
    },
    matchEvents: []
  }
];