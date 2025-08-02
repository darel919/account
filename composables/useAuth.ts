
import { useFetch } from '#app'

export function useAuth() {
  const API_BASE_URL = useRuntimeConfig().public.backendUrl
  const AUTH_PATH = useRuntimeConfig().public.authUrl
  const checkAuth = async (rUrl: string) => {
    const { status } = await fetch(`${API_BASE_URL}${AUTH_PATH}/app`, {
      headers: {
        'Origin': rUrl
      }
    })
    if (status === 200) {
      return true
    }
    if (status === 403) {
      return false
    }
    return false
  }
  const startOAuthFlow = () => {
    window.location.href = `${API_BASE_URL}${AUTH_PATH}/oauth2`
  }
  return { checkAuth, startOAuthFlow }
}
