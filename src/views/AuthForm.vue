<template>
  <div class="flex flex-col items-center">
    <div class="w-1/3 bg-[#141F3B] p-2 rounded-2xl shadow-lg shadow-[#141F3B]">
      <LoaderComp v-if="isLoadingStore" />
      <h1 class="text-3xl font-roboto text-white text-center my-10">Авторизация</h1>
      <div class="flex flex-row items-center m-2">
        <label for="email" class="w-full text-lg text-white font-roboto">Почта:</label>
        <input
          class="bg-[#223054] outline-none text-lg text-white rounded-2xl p-2 w-screen"
          id="email"
          type="email"
          name="email"
          required
          v-model="email"
        />
      </div>
      <div class="flex flex-row items-center m-2">
        <label for="password" class="w-full text-lg text-white font-roboto">Пароль:</label>
        <input
          class="bg-[#223054] outline-none text-lg text-white rounded-2xl p-2 w-screen"
          id="password"
          type="password"
          name="password"
          required
          v-model="password"
        />
      </div>
      <router-link
        to="/recovery"
        class="flex flex-col items-end pr-2 m-2 text-sm font-roboto text-white hover:text-blue-700"
        >Забыли пароль?</router-link
      >
      <div class="flex flex-col items-center m-2">
        <button
          class="w-full bg-[#49BADE] hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded-xl active:bg-blue-900 transition duration-300"
          @click="login"
        >
          Вход
        </button>
        <div class="flex flex-col items-center m-2 text-l font-roboto text-white">
          <p>
            или
            <router-link to="/registration" class="text-blue-500 hover:text-blue-700"
              >зарегистрироваться</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderComp from '@/components/layout/LoaderComp.vue'
import router from '../router'
import { useAuthStore, useIsLoadingStore } from '../stores/auth.store'
import { useNotificationStore } from '@/stores/notification'
import { account } from '../utils/appwrite'

export default {
  components: {
    LoaderComp
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    isLoadingStore() {
      const isLoadingStore = useIsLoadingStore()
      return isLoadingStore.isLoading
    }
  },
  methods: {
    async login() {
      const authStore = useAuthStore()
      const isLoadingStore = useIsLoadingStore()
      const notificationStore = useNotificationStore()
      isLoadingStore.set(true)
      try {
        await account.createEmailPasswordSession(this.email, this.password)
        const responce = await account.get()
        if (responce) {
          localStorage.setItem('token', responce.$idToken)
          localStorage.setItem('email', responce.email)
          localStorage.setItem('name', responce.name)
          authStore.set(responce)
          router.push({ name: 'CabinetPage' })
          notificationStore.showNotification('Авторизация прошла успешно!', 'success')
        }
        isLoadingStore.set(false)
      } catch (error) {
        switch (error.message) {
          case 'Invalid `email` param: Value must be a valid email address':
            notificationStore.showNotification('Почта введена неверно', 'error')
            break
          case 'Invalid `password` param: Password must be between 8 and 256 characters long.':
            notificationStore.showNotification('Пароль должен содержать от 8 символов', 'error')
            break
          case 'Invalid credentials. Please check the email and password.':
            notificationStore.showNotification('Почта или пароль введены неверно', 'error')
            break
          default:
            notificationStore.showNotification('Произошла ошибка', 'error')
            break
        }
      } finally {
        isLoadingStore.isLoading = false
      }
    }
  }
}
</script>
