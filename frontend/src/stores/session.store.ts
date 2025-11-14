import { create } from 'zustand'
import { SessionService } from '../services/session.service'
import type { SanitizedUser } from '../models/sanitized-user.model'

type SessionStore = {
	user?: SanitizedUser
	setUser: (value: SanitizedUser | undefined) => void
}

export const useSessionStore = create<SessionStore>((set) => ({
	user: SessionService.user,
	setUser: (value) => set({ user: value })
}))
