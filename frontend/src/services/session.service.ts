
import type { SanitizedUser } from "../../../backend/src/models/sanitized-user.model";
import type { Session } from "../models/session.model";
import { isTokenValid } from "../utilities/is-token-valid.utility";

export class SessionService {
  private static name = "session";

  static get value(): Session | undefined {
    const raw = localStorage.getItem(this.name);

    if (!raw) return undefined;

    try {
      const parsed = JSON.parse(raw);

      if (
        typeof parsed !== "object" ||
        parsed === null ||
        typeof parsed.token !== "string" ||
        typeof parsed.user !== "object" ||
        parsed.user === null
      ) {
        console.warn("SessionService: datos de sesión corruptos o inválidos");
        return undefined;
      }

      return parsed as Session;
    } catch (err) {
      console.error("SessionService: error parseando la sesión", err);
      return undefined;
    }
  }

  static get token(): string | undefined {
    return this.value?.token;
  }

  static get user(): SanitizedUser | undefined {
    return this.value?.user;
  }

  static set user(newValue: SanitizedUser) {
    if (this.value) {
      this.value = { ...this.value, user: newValue };
    }
  }

  static get isValid(): boolean {
    return this.token ? isTokenValid(this.token) : true;
  }

  static set value(newValue: Session) {
    localStorage.setItem(this.name, JSON.stringify(newValue));
  }

  static delete(): void {
    localStorage.removeItem(this.name);
  }
}
