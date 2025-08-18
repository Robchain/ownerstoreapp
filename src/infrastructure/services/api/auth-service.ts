import { httpClient } from './http-client';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  ApiResponse 
} from '../../../shared/types/api';

export class AuthService {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await httpClient.post<LoginResponse>('/auth/login', credentials);
    
    if (response.success && response.data) {
      // Guardar token y datos del usuario
      httpClient.setAuthToken(response.data.token);
      localStorage.setItem('user', JSON.stringify({
        idUser: response.data.idUser,
        name: response.data.name,
        email: response.data.email,
        rol: response.data.rol
      }));
    }
    
    return response;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    return await httpClient.post<RegisterResponse>('/auth/register', userData);
  }

  async logout(): Promise<ApiResponse<string>> {
    const response = await httpClient.post<string>('/auth/logout');
    
    // Limpiar datos locales independientemente de la respuesta
    httpClient.clearAuthToken();
    
    return response;
  }

  async getUserProfile(): Promise<ApiResponse<any>> {
    return await httpClient.get('/auth/profile');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  // Método para obtener el usuario actual del localStorage
  getCurrentUser(): any | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Método para verificar si el usuario es administrador
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.rol === 'Administrador';
  }
}

export const authService = new AuthService();