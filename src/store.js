import { create } from 'zustand';
//import { persist } from 'zustand/middleware';
import { produce } from 'immer';

const useStore = create((set, get) => ({
  session: null,
  userId: null,
  username: null,
  avatarURL: null,
  setSession: (session) => set({ session }),
  setSessionData: ({ session, userId, username, avatarURL }) =>
    set({
      session,
      userId,
      username,
      avatarURL
    }),
  getSessionData: () => {
    return {
      session: get().session,
      userId: get().userId,
      username: get().username,
      avatarURL: get().avatarURL
    };
  }
}));

export default useStore;
