
import { create } from 'zustand';

interface AdminAuthState {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAdminAuth = create<AdminAuthState>((set) => ({
  isAuthenticated: false,
  login: async (password: string) => {
    // In a real app, this would call a secure authentication API
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password === 'admin123') {
          set({ isAuthenticated: true });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  },
  logout: () => set({ isAuthenticated: false }),
}));
