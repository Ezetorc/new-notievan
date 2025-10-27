import type { SanitizedUser } from "./session.model";

export type AuthResponse = { user: SanitizedUser; token: string }