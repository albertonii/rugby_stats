// Match related types
export interface MatchEvent {
  id: number;
  matchId: number;
  eventType:
    | "try"
    | "conversion"
    | "penalty"
    | "yellow_card"
    | "red_card"
    | "substitution";
  minute: number;
  playerId?: number;
  playerInId?: number; // For substitutions
  playerOutId?: number; // For substitutions
  teamId: number;
  points?: number;
  details?: string;
}

export interface Match {
  id: number;
  competitionId: number;
  homeTeamId: number;
  awayTeamId: number;
  date: string;
  venue: string;
  category: string;
  status: "scheduled" | "in_progress" | "completed";
  round: string;
  homeScore?: number;
  awayScore?: number;
  referee?: {
    id: number;
    name: string;
    role: "main" | "assistant1" | "assistant2" | "fourth";
  }[];
  roster?: {
    homeTeam: number[]; // Player IDs
    awayTeam: number[]; // Player IDs
  };
  matchEvents: MatchEvent[];
}

// Club related types
export interface Club {
  id: number;
  name: string;
  shortName: string;
  logo?: string;
  city: string;
  island: string;
  foundedYear: number;
  mainField: string;
  website?: string;
  description: string;
  history?: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  boardMembers: {
    position: string;
    name: string;
    email?: string;
    since: string;
  }[];
  teams: number[];
  staff: number[];
}

// Team related types
export interface Team {
  id: number;
  clubId: number;
  name: string;
  category: string;
  season: string;
  status: "active" | "inactive";
  delegates: number[];
  players: number[];
  homeField: string;
}

// Player related types
export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  position: string;
  clubId: number;
  teamId: number;
  number: number;
  height: number;
  weight: number;
  birthDate: string;
  licenseNumber: string;
  status: "active" | "injured" | "inactive";
}

// Competition related types
export interface Competition {
  id: number;
  name: string;
  season: string;
  category: string;
  startDate: Date;
  endDate: Date;
  status: "upcoming" | "active" | "completed";
  format: "league" | "tournament";
  description: string;
  pointSystem?: {
    win: number;
    draw: number;
    loss: number;
    tryBonus: number;
    lossBonus: number;
  };
  structure?: {
    groups?: {
      name: string;
      teams: number[];
      matches: number[];
    }[];
    knockout?: {
      semifinals: number[];
      final: number[];
    };
  };
  teams: number[];
  matches: number[];
}

// Category related types
export interface Category {
  id: number;
  name: string;
  description: string;
  ageRange: string;
  status: "active" | "inactive";
}

// User related types
export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Delegado" | "Staff";
  clubId?: number;
  teamId?: number;
  status: "active" | "inactive";
}

// Standing related types
export interface Standing {
  teamId: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  tryBonus: number;
  lossBonus: number;
  points: number;
}

export interface UserRoles {
  isAdmin: boolean;
  isClubDelegate: boolean;
  clubId?: number;
}
