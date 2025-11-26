import type { SanitizedUser } from '../models/sanitized-user.model'

export type SessionStore = {
	user?: SanitizedUser
	setUser: (value: SanitizedUser | undefined) => void
}
