<template>
  <div class="flex flex-col items-center">
    <div class="w-1/3 bg-[#141F3B] p-2 rounded-2xl shadow-lg shadow-[#141F3B]">
      <LoaderComp v-if="isLoadingStore" />
      <form @submit.prevent="register">
        <h1 class="text-3xl font-roboto text-white text-center my-10">Регистрация</h1>
        <div class="flex flex-row items-center m-2">
          <label for="name" class="w-full text-lg text-white font-roboto">Имя:</label>
          <input
            class="bg-[#223054] outline-none text-lg rounded-2xl p-2 w-screen text-white"
            id="name"
            type="text"
            name="name"
            required
            v-model="name"
          />
        </div>
        <div class="flex flex-row items-center m-2">
          <label for="email" class="w-full text-lg text-white font-roboto">Email:</label>
          <input
            class="bg-[#223054] outline-none text-lg rounded-2xl p-2 w-screen text-white"
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
            class="bg-[#223054] outline-none text-lg rounded-2xl p-2 w-screen text-white"
            id="password"
            type="password"
            name="password"
            required
            v-model="password"
          />
        </div>
        <div class="flex flex-col items-center m-">
          <button
            class="w-full bg-[#49BADE] hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded-xl active:bg-blue-900 transition duration-300"
          >
            Зарегистрироваться
          </button>
          <div class="flex flex-col items-center m-2 text-l font-roboto text-white">
            <p>
              Есть аккаунт?
              <router-link to="/authentication" class="text-blue-500 hover:text-blue-700"
                >Войти</router-link
              >
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LoaderComp from '@/components/layout/LoaderComp.vue'
import { useIsLoadingStore, useAuthStore } from '@/stores/auth.store'
import { useNotificationStore } from '@/stores/notification'
import router from '../router'
import { account } from '../utils/appwrite'
import { generateId } from '@/utils/generateId'

export default {
  components: {
    LoaderComp
  },
  data() {
    return {
      email: '',
      password: '',
      name: ''
    }
  },
  computed: {
    isLoadingStore() {
      const isLoadingStore = useIsLoadingStore()
      return isLoadingStore.isLoading
    }
  },
  methods: {
    async register() {
      const authStore = useAuthStore()
      const isLoadingStore = useIsLoadingStore()
      const notificationStore = useNotificationStore()
      isLoadingStore.set(true)
      try {
        const userId = await generateId()
        await account.create(userId, this.email, this.password, this.name)
        await account.createEmailPasswordSession(this.email, this.password)
        const responce = await account.get()
        if (responce) {
          authStore.set(responce)
          localStorage.setItem('token', responce.$idToken)
          router.push({ name: 'CabinetPage' })
          notificationStore.showNotification('Вы успешно зарегистрировались!', 'success')
        }
      } catch (error) {
        switch (error.message) {
          case 'Invalid `email` param: Value must be a valid email address.':
            notificationStore.showNotification('Почта введена неверно', 'error')
            break
          case 'Invalid `password` param: Password must be between 8 and 265 characters long, and should not be one of the commonly used password.':
            notificationStore.showNotification('Пароль должен содержать от 8 символов', 'error')
            break
          case 'A user with the same id, email, or phone already exists in this project.':
            notificationStore.showNotification(
              'Пользователь с такой почтой уже существует',
              'error'
            )
        }
      } finally {
        isLoadingStore.isLoading = false
      }
    }
  }
}
</script>
