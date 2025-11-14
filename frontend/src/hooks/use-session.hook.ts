import { useCallback } from 'react'
import type { SignInFormData } from '../pages/SignIn/models/sign-in-form-data.model'
import type { SignUpFormData } from '../pages/SignUp/models/sign-up-form-data.model'
import { AuthService } from '../services/auth.service'
import { SessionService } from '../services/session.service'
import { useSessionStore } from '../stores/session.store'
import { useSelfUser } from './use-self-user.hook'

export function useSession() {
	const { user, setUser } = useSessionStore()
	const { user: selfUser, refetch: refetchSelf } = useSelfUser()

	const updateSession = useCallback(async () => {
		if (selfUser) {
			SessionService.user = selfUser
			setUser(selfUser)
			return
		}

		const result = await refetchSelf()
		const fetched = result.data
		if (!fetched) return
		SessionService.user = fetched
		setUser(fetched)
	}, [selfUser, refetchSelf])

	const logout = () => {
		SessionService.delete()
		setUser(undefined)
	}

	const login = async (data: SignInFormData) => {
		const result = await AuthService.login(data)

		SessionService.value = result
		setUser(result.user)
	}

	const register = async (data: SignUpFormData) => {
		const result = await AuthService.register(data)

		SessionService.value = result
		setUser(result.user)
	}

	return { user, logout, login, register, updateSession }
}
