<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { validateRedirectUrl, startOAuth } = useAuth()

const rUrl = route.query.rUrl as string

onMounted(async () => {
  if (!rUrl) {
    await router.push('/error?message=Missing redirect URL parameter')
    return
  }

  // Save rUrl to localStorage
  localStorage.setItem('dws-rUrl', rUrl)

  try {
    // Check if the rUrl is in the allowed redirects list
    const isValidRedirect = await validateRedirectUrl(rUrl)

    if (!isValidRedirect) {
      await router.push('/error?message=This URL is not authorized to use DWS authentication method.')
      return
    }

    // Start OAuth flow
    startOAuth()
  } catch (error) {
    console.error('Authentication initialization failed:', error)
    await router.push('/error?message=Authentication service is currently unavailable')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body items-center text-center">
        <div class="loading loading-spinner loading-lg text-primary"></div>
        <h2 class="card-title">Initializing Authentication</h2>
        <p>Please wait while we verify your request...</p>
      </div>
    </div>
  </div>
</template>
