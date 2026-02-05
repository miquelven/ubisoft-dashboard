import mockData from './mockData.json';

export interface Game {
  id: number;
  name: string;
  franchise: string;
  genre: string;
  platforms: string[];
  status: string;
  releaseDate: string;
  price: number;
  rating: number;
  activePlayers: number;
  monthlyRevenue: number;
  metrics: {
    dau: number;
    mau: number;
    avgPlaytime: number;
    retention: number;
    revenueByPlatform: {
      pc: number;
      console: number;
    };
  };
}

export interface Player {
  id: number;
  nickname: string;
  region: string;
  platform: string;
  type: string;
  favoriteGame: string;
  hoursPlayed: number;
  lastLogin: string;
}

export const getGames = () => {
  return mockData.games as Game[];
};

export const getGameById = (id: number) => {
  return mockData.games.find((game) => game.id === id) as Game | undefined;
};

export const getFranchises = () => {
  const franchises = new Set(mockData.games.map((game) => game.franchise));
  return Array.from(franchises);
};

export const getAnalyticsData = () => {
  return mockData.analytics;
};

export const getPlayers = () => {
  return mockData.players as Player[];
};
