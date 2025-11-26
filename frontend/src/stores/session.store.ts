import { create } from 'zustand'
import { SessionService } from '../services/session.service'
import type { SessionStore } from '../models/session-store.model'

export const useSessionStore = create<SessionStore>((set) => ({
	user: SessionService.user,
	setUser: (value) => set({ user: value })
}))
