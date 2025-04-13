import { create } from 'zustand';
import { userDetail } from '@/types/user';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist<{
    user: userDetail | undefined;
    memberId: number | undefined;
    setUser: (input: userDetail | undefined) => void;
    setMemberId: (input: number | undefined) => void;
    logout: () => void;
  }>(
    (set, get) => ({
      user: undefined,
      memberId: undefined,
      setUser: (input: userDetail | undefined) => {
        set({ user: input });
      },
      setMemberId: (input: number | undefined) => {
        set({ memberId: input });
      },
      logout: () => {
        set({ user: undefined });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
