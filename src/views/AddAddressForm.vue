<template>
  <div class="flex flex-col items-center">
    <h1 class="text-xl font-roboto text-white">Добавление адреса</h1>
    <form @submit.prevent="sendData">
      <div class="flex flex-col items-center gap-2 m-2">
        <label class="text-lg text-white font-roboto">Город:</label>
        <input
          class="bg-[#223054] outline-none text-lg text-white rounded-2xl p-2"
          type="text"
          required
          v-model="city"
        />
        <label class="text-lg text-white font-roboto">Улица:</label>
        <input
          class="bg-[#223054] outline-none text-lg text-white rounded-2xl p-2"
          type="text"
          required
          v-model="street"
        />
        <label class="text-lg text-white font-roboto">Дом:</label>
        <input
          class="bg-[#223054] outline-none text-lg text-white rounded-2xl p-2"
          type="text"
          required
          v-model="house"
        />
        <label class="text-lg text-white font-roboto">Квартира:</label>
        <input
          class="bg-[#223054] outline-none text-lg text-white rounded-2xl p-2"
          type="text"
          required
          v-model="apartment"
        />
      </div>
      <div class="flex flex-col items-center">
        <button
          class="flex p-2 gap-2 items-center hover:cursor-pointer hover:bg-blue-500 hover:text-black transition duration-300 bg-blue-700 rounded-xl"
          type="submit"
        >
          <p class="text-lg font-roboto">Добавить</p>
          <PlusCircleIcon class="h-7" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useNotificationStore } from '@/stores/notification'
import { addAddress } from '@/utils/appwrite_db'
export default {
  data() {
    return {
      city: '',
      street: '',
      house: '',
      apartment: ''
    }
  },
  emits: ['close', 'fetchData'],
  methods: {
    async sendData() {
      const notification = useNotificationStore()
      const address = {
        city: this.city,
        street: this.street,
        house: this.house,
        apartment: this.apartment
      }
      try {
        await addAddress(address)
        this.$emit('fetchData')
        this.$emit('close')
      } catch (error) {
        switch (error.message) {
          default:
            notification.showNotification('Произошла ошибка при добавлении адреса в БД', 'error')
            break
        }
      }
    }
  }
}
</script>
