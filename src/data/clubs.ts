import { Club } from '../types';

export const clubs: Club[] = [
  {
    id: 1,
    name: 'Club Rugby Las Palmas',
    shortName: 'CRLP',
    logo: '/logos/crlp.png',
    city: 'Las Palmas de Gran Canaria',
    island: 'Gran Canaria',
    foundedYear: 1987,
    mainField: 'Campo de Rugby Juan Rojas',
    website: 'www.crlp.es',
    description: 'Club histórico de Gran Canaria con más de 30 años de historia',
    history: `Fundado en 1987, el CRLP ha sido uno de los clubes más importantes 
    en el desarrollo del rugby canario. Ha formado a numerosos jugadores internacionales 
    y ha sido campeón regional en múltiples ocasiones.`,
    contact: {
      email: 'info@crlp.es',
      phone: '928123456',
      address: 'C/ Juan Rojas s/n, Las Palmas de GC'
    },
    socialMedia: {
      instagram: '@crugbylp',
      facebook: 'CRugbyLP',
      tiktok: '@crugbylp'
    },
    boardMembers: [
      {
        position: 'Presidente',
        name: 'Antonio Ramírez',
        email: 'presidente@crlp.es',
        since: '2020'
      }
    ],
    teams: [],
    staff: []
  },
  {
    id: 2,
    name: 'Club Rugby Universitario La Laguna',
    shortName: 'CRULL',
    logo: '/logos/crull.png',
    city: 'La Laguna',
    island: 'Tenerife',
    foundedYear: 1989,
    mainField: 'Campo Universidad de La Laguna',
    website: 'www.crull.es',
    description: 'Club universitario con fuerte arraigo en la comunidad estudiantil',
    history: `El CRULL nació en 1989 vinculado a la Universidad de La Laguna. 
    Desde entonces ha sido un referente en la formación de jugadores y en la 
    promoción del rugby universitario.`,
    contact: {
      email: 'info@crull.es',
      phone: '922654321',
      address: 'Campus Universitario, La Laguna'
    },
    socialMedia: {
      instagram: '@crull_rugby',
      facebook: 'CRULaLaguna'
    },
    boardMembers: [
      {
        position: 'Presidente',
        name: 'María González',
        email: 'presidente@crull.es',
        since: '2021'
      }
    ],
    teams: [],
    staff: []
  },
  {
    id: 3,
    name: 'Club Rugby Mahoh',
    shortName: 'CR Mahoh',
    logo: '/logos/mahoh.png',
    city: 'Puerto del Rosario',
    island: 'Fuerteventura',
    foundedYear: 2012,
    mainField: 'Campo Municipal Puerto del Rosario',
    website: 'www.mahoh.es',
    description: 'Club pionero del rugby en Fuerteventura',
    history: `Fundado en 2012, el CR Mahoh ha sido fundamental en el desarrollo 
    del rugby en Fuerteventura. Su trabajo en categorías base ha permitido el 
    crecimiento del deporte en la isla.`,
    contact: {
      email: 'info@mahoh.es',
      phone: '928789012',
      address: 'Avda. Deportiva 23, Puerto del Rosario'
    },
    socialMedia: {
      instagram: '@crmahoh',
      facebook: 'CRMahoh'
    },
    boardMembers: [
      {
        position: 'Presidente',
        name: 'Juan Betancor',
        email: 'presidente@mahoh.es',
        since: '2019'
      }
    ],
    teams: [],
    staff: []
  },
  {
    id: 4,
    name: 'Lanzarote Rugby Club',
    shortName: 'Lanzarote RC',
    logo: '/logos/lanzarote.png',
    city: 'Arrecife',
    island: 'Lanzarote',
    foundedYear: 1992,
    mainField: 'Ciudad Deportiva Lanzarote',
    website: 'www.lanzaroterugby.es',
    description: 'El club más antiguo de las islas orientales',
    history: `El Lanzarote RC ha sido clave en el desarrollo del rugby en las 
    islas orientales desde su fundación en 1992. Su escuela de rugby ha formado 
    a numerosos jugadores que han llegado a la selección canaria.`,
    contact: {
      email: 'info@lanzaroterugby.es',
      phone: '928456789',
      address: 'C/ Deportiva s/n, Arrecife'
    },
    socialMedia: {
      instagram: '@lanzaroterugby',
      facebook: 'LanzaroteRugby'
    },
    boardMembers: [
      {
        position: 'Presidente',
        name: 'Carlos Cabrera',
        email: 'presidente@lanzaroterugby.es',
        since: '2018'
      }
    ],
    teams: [],
    staff: []
  },
  {
    id: 5,
    name: 'Ñandú Rugby Club',
    shortName: 'Ñandú RC',
    logo: '/logos/nandu.png',
    city: 'Adeje',
    island: 'Tenerife',
    foundedYear: 2015,
    mainField: 'Campo Municipal de Adeje',
    website: 'www.nandurc.es',
    description: 'Club joven con fuerte presencia en el sur de Tenerife',
    history: `El Ñandú RC nació en 2015 para dar respuesta a la demanda de rugby 
    en el sur de Tenerife. En pocos años se ha convertido en uno de los clubes 
    más dinámicos de la isla.`,
    contact: {
      email: 'info@nandurc.es',
      phone: '922345678',
      address: 'Complejo Deportivo Adeje'
    },
    socialMedia: {
      instagram: '@nandurc',
      facebook: 'NanduRC',
      tiktok: '@nandurc'
    },
    boardMembers: [
      {
        position: 'Presidente',
        name: 'Pedro Martín',
        email: 'presidente@nandurc.es',
        since: '2020'
      }
    ],
    teams: [],
    staff: []
  },
  {
    id: 6,
    name: 'Club Rugby Boatmen',
    shortName: 'CR Boatmen',
    logo: '/logos/boatmen.png',
    city: 'El Médano',
    island: 'Tenerife',
    foundedYear: 2010,
    mainField: 'Campo Municipal El Médano',
    website: 'www.crboatmen.es',
    description: 'Club con fuerte tradición en rugby playa',
    history: `El CR Boatmen se fundó en 2010 y desde entonces ha sido pionero 
    en el desarrollo del rugby playa en Canarias. Su ubicación en El Médano 
    le ha permitido organizar importantes torneos de esta modalidad.`,
    contact: {
      email: 'info@crboatmen.es',
      phone: '922234567',
      address: 'Paseo Marítimo El Médano'
    },
    socialMedia: {
      instagram: '@crboatmen',
      facebook: 'CRBoatmen'
    },
    boardMembers: [
      {
        position: 'Presidente',
        name: 'Luis Rodríguez',
        email: 'presidente@crboatmen.es',
        since: '2019'
      }
    ],
    teams: [],
    staff: []
  }
];