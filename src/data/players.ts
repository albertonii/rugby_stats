import { Player } from '../types';

export const players: Player[] = [
  // CRLP Senior Masculino
  {
    id: 1,
    firstName: "Carlos",
    lastName: "Rodríguez",
    nickname: "El Toro",
    position: "Pilar",
    clubId: 1,
    teamId: 1,
    number: 1,
    height: 185,
    weight: 105,
    birthDate: "1995-03-15",
    licenseNumber: "CRLP-001",
    status: "active"
  },
  {
    id: 2,
    firstName: "Juan",
    lastName: "Santana",
    position: "Talonador",
    clubId: 1,
    teamId: 1,
    number: 2,
    height: 178,
    weight: 95,
    birthDate: "1998-07-22",
    licenseNumber: "CRLP-002",
    status: "active"
  },
  {
    id: 3,
    firstName: "Daniel",
    lastName: "Pérez",
    position: "Segunda Línea",
    clubId: 1,
    teamId: 1,
    number: 4,
    height: 192,
    weight: 108,
    birthDate: "1997-05-10",
    licenseNumber: "CRLP-003",
    status: "active"
  },

  // CRLP Senior Femenino
  {
    id: 4,
    firstName: "Laura",
    lastName: "González",
    position: "Centro",
    clubId: 1,
    teamId: 2,
    number: 12,
    height: 170,
    weight: 65,
    birthDate: "1999-04-18",
    licenseNumber: "CRLP-F001",
    status: "active"
  },
  {
    id: 5,
    firstName: "Ana",
    lastName: "Pérez",
    position: "Ala",
    clubId: 1,
    teamId: 2,
    number: 11,
    height: 168,
    weight: 63,
    birthDate: "2000-08-25",
    licenseNumber: "CRLP-F002",
    status: "injured"
  },

  // CRULL Senior Masculino
  {
    id: 20,
    firstName: "Miguel",
    lastName: "Torres",
    position: "Apertura",
    clubId: 2,
    teamId: 4,
    number: 10,
    height: 175,
    weight: 80,
    birthDate: "2000-11-30",
    licenseNumber: "CRULL-001",
    status: "active"
  },
  {
    id: 21,
    firstName: "David",
    lastName: "García",
    position: "Segunda Línea",
    clubId: 2,
    teamId: 4,
    number: 5,
    height: 190,
    weight: 105,
    birthDate: "1996-02-15",
    licenseNumber: "CRULL-002",
    status: "active"
  },

  // CRULL Senior Femenino
  {
    id: 25,
    firstName: "Carmen",
    lastName: "Díaz",
    position: "Medio Melé",
    clubId: 2,
    teamId: 5,
    number: 9,
    height: 165,
    weight: 60,
    birthDate: "2001-06-20",
    licenseNumber: "CRULL-F001",
    status: "active"
  },

  // CR Mahoh Senior Masculino
  {
    id: 30,
    firstName: "Alejandro",
    lastName: "Betancor",
    position: "Pilar",
    clubId: 3,
    teamId: 6,
    number: 1,
    height: 182,
    weight: 102,
    birthDate: "1994-09-12",
    licenseNumber: "MAHOH-001",
    status: "active"
  },
  {
    id: 31,
    firstName: "Francisco",
    lastName: "Morales",
    position: "Tercera Línea",
    clubId: 3,
    teamId: 6,
    number: 7,
    height: 185,
    weight: 95,
    birthDate: "1997-03-28",
    licenseNumber: "MAHOH-002",
    status: "active"
  },

  // Lanzarote RC Senior Masculino
  {
    id: 40,
    firstName: "Pablo",
    lastName: "Cabrera",
    position: "Centro",
    clubId: 4,
    teamId: 8,
    number: 13,
    height: 180,
    weight: 88,
    birthDate: "1998-11-05",
    licenseNumber: "LRC-001",
    status: "active"
  },
  {
    id: 41,
    firstName: "Javier",
    lastName: "Toledo",
    position: "Ala",
    clubId: 4,
    teamId: 8,
    number: 14,
    height: 178,
    weight: 82,
    birthDate: "1999-07-15",
    licenseNumber: "LRC-002",
    status: "active"
  },

  // Lanzarote RC Senior Femenino
  {
    id: 45,
    firstName: "María",
    lastName: "Hernández",
    position: "Apertura",
    clubId: 4,
    teamId: 9,
    number: 10,
    height: 170,
    weight: 65,
    birthDate: "2000-04-22",
    licenseNumber: "LRC-F001",
    status: "active"
  },

  // Ñandú RC Senior Masculino
  {
    id: 50,
    firstName: "Roberto",
    lastName: "Martín",
    position: "Talonador",
    clubId: 5,
    teamId: 10,
    number: 2,
    height: 175,
    weight: 90,
    birthDate: "1996-12-08",
    licenseNumber: "NANDU-001",
    status: "active"
  },
  {
    id: 51,
    firstName: "Luis",
    lastName: "Sánchez",
    position: "Medio Melé",
    clubId: 5,
    teamId: 10,
    number: 9,
    height: 172,
    weight: 75,
    birthDate: "1997-08-30",
    licenseNumber: "NANDU-002",
    status: "active"
  },

  // CR Boatmen Senior Masculino
  {
    id: 60,
    firstName: "Antonio",
    lastName: "Ruiz",
    position: "Segunda Línea",
    clubId: 6,
    teamId: 12,
    number: 4,
    height: 188,
    weight: 105,
    birthDate: "1995-01-25",
    licenseNumber: "BOAT-001",
    status: "active"
  },
  {
    id: 61,
    firstName: "Manuel",
    lastName: "López",
    position: "Centro",
    clubId: 6,
    teamId: 12,
    number: 12,
    height: 182,
    weight: 90,
    birthDate: "1998-05-17",
    licenseNumber: "BOAT-002",
    status: "active"
  },

  // CR Boatmen Senior Femenino
  {
    id: 65,
    firstName: "Patricia",
    lastName: "Ramírez",
    position: "Ala",
    clubId: 6,
    teamId: 13,
    number: 11,
    height: 168,
    weight: 63,
    birthDate: "1999-10-12",
    licenseNumber: "BOAT-F001",
    status: "active"
  },
  {
    id: 66,
    firstName: "Sara",
    lastName: "González",
    position: "Zaguero",
    clubId: 6,
    teamId: 13,
    number: 15,
    height: 172,
    weight: 65,
    birthDate: "2000-03-08",
    licenseNumber: "BOAT-F002",
    status: "active"
  }
];