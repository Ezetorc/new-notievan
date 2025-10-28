import type { SignInFormData } from "../pages/SignIn/models/sign-in-form-data.model"
import type { SignUpFormData } from "../pages/SignUp/models/sign-up-form-data.model"
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

  const login = async (data: SignInFormData) => {
    const result = await AuthService.login(data);

    SessionService.value = result;
    setUser(result.user)
  }

  const register = async (data: SignUpFormData) => {
    const result = await AuthService.register(data);

    SessionService.value = result;
    setUser(result.user)
  }

  return { user, logout, login, register, updateSession }
}