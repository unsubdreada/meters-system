<template>
  <div class="flex flex-col items-center">
    <div class="w-1/3 bg-[#141F3B] p-2 rounded-2xl shadow-lg shadow-[#141F3B]">
      <h1 class="text-3xl font-roboto text-white text-center my-10">Восстановление пароля</h1>
      <p class="flex flex-col items-center m-2 text-l font-roboto text-white">Введите вашу почту</p>
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
        <button
          class="w-full bg-[#49BADE] hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded-xl active:bg-blue-900 transition duration-300"
          @click="recovery"
        >
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { account } from '../utils/appwrite'

export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    async recovery() {
      try {
        await account.createRecovery(this.email, 'https://localhost:5173/recovery')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
