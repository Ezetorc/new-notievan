import { create } from 'zustand'
import type { SanitizedUser } from '../../../backend/src/models/sanitized-user.model'
import { SessionService } from '../services/session.service'

type SessionStore = {
  user?: SanitizedUser
  setUser: (value: SanitizedUser | undefined) => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  user: SessionService.user,
  setUser: (value) => set({ user: value })
}))