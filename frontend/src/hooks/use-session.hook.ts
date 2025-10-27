import type { LoginDtoType } from "../../../backend/src/models/dtos/login.dto"
import type { RegisterDtoType } from "../../../backend/src/models/dtos/register.dto"
import { AuthService } from "../services/auth.service"
import { SessionService } from "../services/session.service"
import { useSessionStore } from "../stores/session.store"

export function useSession() {
  const { user, setUser } = useSessionStore()

  const updateSession = async () => {
    const user = await AuthService.getUser()

    if (!user) return

    SessionService.user = user
    setUser(user)
  }

  const logout = () => {
    SessionService.delete()
    setUser(undefined)
  }

  const login = async (data: LoginDtoType) => {
    const result = await AuthService.login(data);

    SessionService.value = result;
    setUser(result.user)
  }

  const register = async (data: RegisterDtoType) => {
    const result = await AuthService.register(data);

    SessionService.value = result;
    setUser(result.user)
  }

  return { user, logout, login, register, updateSession }
}