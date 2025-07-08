/**
 * Composable for DWS Account authentication utilities
 */
export const useAuth = () => {
  const config = useRuntimeConfig()
  const API_BASE_URL = config.public.backendUrl
  const AUTH_PATH = config.public.authUrl

  /**
   * Get allowed redirect URLs from the API
   */
  const getAllowedRedirects = async () => {
    try {
      const response = await $fetch(`${API_BASE_URL}/apps/auth?version=2`)
      return response as { allowedRedirects: string[] }
    } catch (error) {
      throw new Error('Failed to fetch allowed redirects')
    }
  }

  /**
   * Validate if a URL is in the allowed redirects list
   */
  const validateRedirectUrl = async (url: string): Promise<boolean> => {
    try {
      const { allowedRedirects } = await getAllowedRedirects()
      return allowedRedirects.includes(url)
    } catch (error) {
      return false
    }
  }

  /**
   * Start OAuth flow
   */
  const startOAuth = () => {
    window.location.href = `${API_BASE_URL}${AUTH_PATH}/oauth`
  }

  /**
   * Clear authentication data from localStorage
   */
  const clearAuthData = () => {
    localStorage.removeItem('dws-rUrl')
  }

  return {
    getAllowedRedirects,
    validateRedirectUrl,
    startOAuth,
    clearAuthData
  }
}
