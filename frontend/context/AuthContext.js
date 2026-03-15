import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    }
    setLoading(false);
  }, []);

  const login = (authData) => {
    // authData should have { token, user: { name, email, role, etc } }
    setUser(authData.user);
    localStorage.setItem('user', JSON.stringify(authData.user));
    localStorage.setItem('token', authData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const refreshUser = async () => {
    try {
      const response = await import('@/utils/api/client').then(m => m.default.get('/auth/profile'));
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error refreshing user profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn: !!user, 
      isAdmin: user?.role === 'ROLE_ADMIN' || user?.role === 'admin', 
      loading,
      isMounted,
      login, 
      logout,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
