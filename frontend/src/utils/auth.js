const AUTH_KEY = 'ecommerce_user';

export const authService = {
  setUser: (user) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  },
  
  getUser: () => {
    const userStr = localStorage.getItem(AUTH_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem(AUTH_KEY);
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_KEY);
  },
  
  isAdmin: () => {
    const user = authService.getUser();
    return user && user.role === 'ADMIN';
  },
};

