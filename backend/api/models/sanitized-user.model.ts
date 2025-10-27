import { Role } from "../../prisma/generated/prisma/index.js";
import type { User } from "../../prisma/generated/prisma/client.js";

export class SanitizedUser {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.createdAt = user.createdAt.toISOString();
  }

  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
}
