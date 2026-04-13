import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  id: string;
  name: string;
}

interface AuthState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  getUser: () => UserInfo | null;
  deleteUser: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      getUser: () => get().user,
      deleteUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
