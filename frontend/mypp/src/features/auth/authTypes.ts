export interface User {
  id: string;
  name: string;
  email: string;
  role: string; // Added role
}

export interface AuthResponse {
  user: User;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterData extends Credentials {
  username: string;
  confirmPassword?: string;
}

export interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}