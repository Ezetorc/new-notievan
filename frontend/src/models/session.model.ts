import { SanitizedUser } from './../../../backend/src/models/sanitized-user.model';

export type Session = {
  user: SanitizedUser;
  token: string;
};
