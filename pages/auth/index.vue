<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { clearAuthData } = useAuth()

const callback = route.query.callback as string

onMounted(async () => {
  if (!callback) {
    await router.push('/error?message=Missing authentication callback')
    return
  }

  try {
    // Get the saved rUrl from localStorage
    const savedRUrl = localStorage.getItem('dws-rUrl')
    
    if (!savedRUrl) {
      await router.push('/error?message=No redirect URL found. Authentication session may have expired.')
      return
    }

    // Construct the callback URL to redirect to the client
    const clientCallbackUrl = new URL('/auth', savedRUrl)
    clientCallbackUrl.searchParams.set('at', callback)
    clientCallbackUrl.searchParams.set('rt', 'null')

    // Clean up localStorage
    clearAuthData()

    // Redirect back to the client app
    window.location.href = clientCallbackUrl.toString()
  } catch (error) {
    console.error('Authentication callback processing failed:', error)
    await router.push('/error?message=Failed to process authentication callback')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body items-center text-center">
        <div class="loading loading-spinner loading-lg text-success"></div>
        <h2 class="card-title text-success">Authentication Successful</h2>
        <p>Redirecting you back to the application...</p>
      </div>
    </div>
  </div>
</template>