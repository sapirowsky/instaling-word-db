<script setup>
  const email = ref()
  const password = ref()
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const login = async () => {
    const { user, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
  }

  onMounted(() => {
    watchEffect(() => {
      if (user.value) {
        navigateTo("/")
      }
    })
  })
</script>
<template>
  <main class="w-full h-[100dvh] grid place-content-center">
    <div class="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Email"
        v-model="email"
        class="p-2 bg-gray-600 rounded w-56"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="p-2 bg-gray-600 rounded"
      />
      <button class="bg-green-500 h-10 rounded text-black" @click="login()">
        Zaloguj
      </button>
    </div>

    <NuxtLink to="/register" class="p-2 underline flex justify-center"
      >Zarejestruj</NuxtLink
    >
  </main>
</template>
