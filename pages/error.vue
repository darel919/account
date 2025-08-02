<script setup lang="ts">
const route = useRoute()

const message = route.query.message as string || 'An error occurred'
const countdown = ref(3)
const isCountingDown = ref(false)

const getSavedRUrl = () => {
  return localStorage.getItem('dws-rUrl')
}

const hasRUrl = computed(() => !!getSavedRUrl())

const cancelAndRedirect = () => {
  const rUrl = getSavedRUrl()
  if (!rUrl) {
    closeWindow()
    return
  }
  try {
    const url = new URL(rUrl)
    url.pathname = '/auth'
    url.searchParams.set('at', '')
    url.searchParams.set('rt', '')
    window.location.href = url.toString()
  } catch (e) {
    closeWindow()
  }
}

const closeWindow = () => {
  try {
    if (window.opener) {
      window.close()
    } else {
      window.close()
    }
  } catch (error) {
    window.location.href = '/error?message=' + encodeURIComponent('This window is unable to be closed automatically. Please close this window.')
  }
}

const startCountdown = () => {
  isCountingDown.value = true
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      closeWindow()
    }
  }, 1000)
}

onMounted(() => {
  if (window.opener || window.parent !== window) {
    startCountdown()
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body items-center text-center">
        <div class="text-error text-6xl mb-4">⚠️</div>
        <h2 class="card-title text-error">Authentication Error</h2>
        <p class="text-center">{{ message }}</p>
        <div v-if="hasRUrl" class="card-actions justify-end mt-4">
          <button 
            v-if="!isCountingDown" 
            class="btn btn-primary" 
            @click="cancelAndRedirect"
          >
            Cancel
          </button>
          <div v-else class="text-center">
            <p class="text-sm text-base-content/70 mb-2">
              Closing window in {{ countdown }} second{{ countdown !== 1 ? 's' : '' }}...
            </p>
            <p class="text-xs text-base-content/50 mb-2">
              If this window isn't closing by itself, you should close it manually.
            </p>
            <button 
              class="btn btn-sm btn-outline" 
              @click="closeWindow"
            >
              Close Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
