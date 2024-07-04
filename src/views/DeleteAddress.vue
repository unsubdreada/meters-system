<template>
  <div class="flex flex-col items-center gap-2 m-2">
    <h1 class="text-xl font-roboto text-white">Удаление адреса</h1>
    <p class="text-sm font-roboto text-white">
      {{ address.city }}, {{ address.street }}, д.{{ address.house }}, кв.{{ address.apartment }}
    </p>
    <ExclamationTriangleIcon class="w-10 text-red-500" />
    <p class="text-sm font-roboto text-white w-1/2">
      Вы уверены, что хотите удалить адрес? Это действие не может быть отменено.
    </p>
    <button
      class="w-1/2 bg-red-700 hover:bg-red-800 text-white text-xl font-bold py-2 rounded-xl active:bg-red-900 transition duration-300"
      @click="deleteAddress"
    >
      Удалить
    </button>
  </div>
</template>

<script>
import { useNotificationStore } from '@/stores/notification'
import { deleteAddress } from '@/utils/appwrite_db'

export default {
  props: {
    address: {
      type: Object,
      required: true
    }
  },
  methods: {
    async deleteAddress() {
      const notification = useNotificationStore()
      try {
        await deleteAddress(this.address.$id)
        this.$emit('fetchData')
        this.$emit('close')
        notification.showNotification('Адрес удален', 'success')
      } catch (error) {
        console.log('Произошла ошибка при удалении адреса из БД', error)
      }
    }
  }
}
</script>
