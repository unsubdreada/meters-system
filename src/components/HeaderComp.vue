<script>
import { useAuthStore } from '../stores/auth.store'
import { account } from '../utils/appwrite'
import router from '../router'
import LogoIcon from './icons/LogoIcon.vue'

export default {
  components: {
    LogoIcon
  },
  setup() {
    const authStore = useAuthStore()
    const logout = async () => {
      try {
        await account.deleteSession('current')
        authStore.clear()
        router.push({ name: 'HomePage' })
      } catch (error) {
        console.log(error)
      }
    }
    return { authStore, logout }
  }
}
</script>

<template>
  <header>
    <router-link to="/"><LogoIcon /></router-link>
    <div v-if="authStore.isAuth" class="flex space-x-5">
      <p class="text-xl text-white font-roboto border-r-2 border-white pr-5">
        {{ authStore.name }} ({{ authStore.email }})
      </p>
      <p
        class="text-xl text-[#38BDF8] font-roboto hover:text-white transition duration-200 cursor-pointer"
        @click="logout"
      >
        Выход
      </p>
    </div>
    <div v-else class="flex space-x-5">
      <router-link
        to="/registration"
        class="text-xl text-[#38BDF8] font-roboto hover:text-white transition duration-200"
        >Регистрация</router-link
      >
      <router-link
        to="/authentication"
        class="text-xl text-[#38BDF8] font-roboto hover:text-white transition duration-200"
        >Вход</router-link
      >
    </div>
  </header>
</template>
