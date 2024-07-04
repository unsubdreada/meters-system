<template>
  <div class="flex flex-col items-center">
    <h1 class="text-xl font-roboto text-white">Настройки:</h1>
    <p class="text-sm font-roboto text-white">
      {{ address.city }}, {{ address.street }}, д.{{ address.house }}, кв.{{ address.apartment }}
    </p>
  </div>
  <form @submit.prevent="addMeters">
    <div class="flex flex-row m-4 gap-2">
      <input
        type="text"
        placeholder="Имя"
        required
        class="bg-[#223054] rounded-2xl p-2"
        v-model="meterData.name"
      />
      <input
        type="text"
        placeholder="Номер счётчика"
        class="bg-[#223054] rounded-2xl p-2"
        v-model="meterData.meterNumber"
      />
      <select class="bg-[#223054] rounded-2xl p-2" v-model="meterData.type" required>
        <option value="ХВС">ХВС</option>
        <option value="ГВС">ГВС</option>
        <option value="Эл-во">Эл-во</option>
        <option value="Газ">Газ</option>
      </select>
      <button
        type="submit"
        class="bg-[#49BADE] hover:bg-blue-700 text-white p-2 rounded-full active:bg-blue-900 transition duration-300"
      >
        <PlusIcon class="h-6" />
      </button>
    </div>
  </form>
  <div v-if="meters.length > 0">
    <h1>Уже существующие счетчики:</h1>
    <div class="max-h-96 overflow-y-scroll">
      <table class="w-full">
        <thead class="sticky top-0 bg-[#223054] text-white">
          <tr>
            <th>Тип</th>
            <th>Имя</th>
            <th>Номер</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="meter in meters" :key="meter.meterNumber" class="">
            <td class="p-2">{{ meter.type }}</td>
            <td class="p-2">{{ meter.name }}</td>
            <td class="p-2">{{ meter.meterNumber }}</td>
            <td class="p-2">
              <XMarkIcon
                class="w-6 hover:text-red-500 cursor-pointer mx-auto"
                @click="deleteMeters(meter)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useNotificationStore } from '@/stores/notification'
import { deleteMeters } from '@/utils/appwrite_db'
import { addMeters } from '@/utils/appwrite_db'

export default {
  props: {
    address: {
      type: Object,
      required: true
    },
    meters: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      meterData: {
        meterNumber: '',
        name: '',
        type: 'ХВС'
      }
    }
  },
  emits: ['close', 'fetchData'],
  methods: {
    async addMeters() {
      const notificationStore = useNotificationStore()
      try {
        const addressId = this.address.addressId
        await addMeters(addressId, this.meterData)
        this.$emit('fetchData')
        notificationStore.showNotification('Добавлены счётчики в БД', 'success')
      } catch (error) {
        notificationStore.showNotification(
          'Произошла ошибка при добавлении счётчиков в БД',
          'error'
        )
      }
    },
    async deleteMeters(meter) {
      const notificationStore = useNotificationStore()
      try {
        await deleteMeters(meter.$id)
        this.$emit('fetchData')
        notificationStore.showNotification('Счётчики удалены из БД', 'success')
      } catch (error) {
        notificationStore.showNotification('Произошла ошибка при удалении счётчиков из БД', 'error')
      }
    }
  }
}
</script>
