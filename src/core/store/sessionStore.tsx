import AsyncStorage from "@react-native-async-storage/async-storage";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { RoleName } from "../../shared/enums/roleName";

type SessionParams = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  token: string;
  role: RoleName;
};

export interface UserStore {
  session: SessionParams | null;
  setSession: (sessionData: SessionParams) => void;
  logout: () => void;
}

const useSessionStore = create<UserStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: (sessionData: SessionParams) => {
        set({ session: sessionData });
      },

      logout: () => set({ session: null }),
    }),
    {
      name: "quality-auth",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSessionStore;