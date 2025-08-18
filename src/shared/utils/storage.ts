export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};