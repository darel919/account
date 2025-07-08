<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const message = route.query.message as string || 'An error occurred'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body items-center text-center">
        <div class="text-error text-6xl mb-4">⚠️</div>
        <h2 class="card-title text-error">Authentication Error</h2>
        <p class="text-center">{{ message }}</p>
        <div class="card-actions justify-end mt-4">
          <button class="btn btn-primary" @click="router.push('/')">
            Return Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
