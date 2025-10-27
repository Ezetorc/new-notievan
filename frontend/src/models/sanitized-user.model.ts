import type { Role } from "./role.model";

export type SanitizedUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
}