<script setup>
  const email = ref()
  const password = ref()
  const password2 = ref()
  const isPasswordExact = ref(true)
  const client = useSupabaseClient()

  const register = async () => {
    if (password.value === password2.value && password.value.length > 6) {
      const { user, error } = await client.auth.signUp({
        email: email.value,
        password: password.value,
      })
    } else {
      isPasswordExact.value = false
    }
  }
  const user = useSupabaseUser()
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
        class="p-2 rounded"
        :class="isPasswordExact ? 'bg-gray-600' : 'bg-red-400'"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="password2"
        class="p-2 rounded"
        :class="isPasswordExact ? 'bg-gray-600' : 'bg-red-400'"
      />
      <button class="bg-green-500 h-10 rounded text-black" @click="register()">
        Zarejestruj
      </button>
    </div>
    <NuxtLink to="/login" class="p-2 underline flex justify-center"
      >Jeżeli masz konto, zaloguj</NuxtLink
    >
  </main>
</template>
