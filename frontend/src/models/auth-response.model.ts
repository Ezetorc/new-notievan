import type { SanitizedUser } from "../../../backend/src/models/sanitized-user.model";

export type AuthResponse = { user: SanitizedUser; token: string }