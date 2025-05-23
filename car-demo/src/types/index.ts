export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  exteriorColor: string;
  interiorColor: string;
  fuelType: string;
  transmission: string;
  engine: string;
  horsepower: number;
  images: string[];
  features: string[];
  description: string;
}

export interface User {
  email: string;
  password: string;
}

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};