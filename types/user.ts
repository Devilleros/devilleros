export type User = {
    id: string;
    email: string;
    name: string | null;
    lastName: string | null;
    image: string | null;
    role: string;
    createdAt?: string;
    updatedAt?: string;
  };

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};