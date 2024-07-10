<template>
  <div class="flex flex-row m-2">
    <div v-if="meters.length > 0">
      <table class="w-full border-separate border-spacing-2">
        <tr class="border-b-2 pb-2 border-[#374A7C] text-s">
          <th>Тип</th>
          <th>Имя</th>
          <th>Номер</th>
          <th>Дата последнего показания</th>
          <th>Последнее показание</th>
          <th>Новое показание</th>
          <th>Разница</th>
        </tr>
        <tr v-for="meter in meters" :key="meter.$id" class="text-s text-white">
          <td>{{ meter.type }}</td>
          <td>{{ meter.name }}</td>
          <td>{{ meter.meterNumber || '-' }}</td>
          <td>
            {{ getLastReadingData(meter) }}
          </td>
          <td>{{ getLastReading(meter) }}</td>
          <td>
            <input
              type="number"
              min="0"
              class="bg-[#223054] rounded-2xl p-2 outline-none"
              v-model.number="meter.newReading"
            />
          </td>
          <td class="text-red">{{ getDifference(meter) || '-' }}</td>
          <td>
            <PencilIcon
              class="h-8 hover:text-lime-400 hover:cursor-pointer"
              @click="handleAddReading(meter)"
            />
          </td>
        </tr>
      </table>
    </div>
    <div v-else class="flex flex-col">
      <p class="items-center text-white text-xl">Нет данных</p>
    </div>
  </div>
</template>

<script>
import { useNotificationStore } from '@/stores/notification'
import { addReading } from '@/utils/appwrite_db'
export default {
  props: {
    meters: {
      type: Array,
      required: true
    }
  },
  setup() {
    const getLastReadingData = (meter) => {
      if (meter.readings && meter.readings.length > 0) {
        const lastReading = JSON.parse(meter.readings[meter.readings.length - 1])
        return lastReading.createdAt
      } else {
        return '-'
      }
    }
    const getLastReading = (meter) => {
      if (meter.readings && meter.readings.length > 0) {
        const lastReading = JSON.parse(meter.readings[meter.readings.length - 1])
        return lastReading.readingValue
      } else {
        return '-'
      }
    }
    const getDifference = (meter) => {
      const lastReading = getLastReading(meter)
      if (lastReading !== '-' && meter.newReading > 0) {
        return (meter.newReading - lastReading).toFixed(3)
      } else {
        return '-'
      }
    }

    return {
      getLastReadingData,
      getLastReading,
      getDifference
    }
  },
  methods: {
    async handleAddReading(meter) {
      const notificationStore = useNotificationStore()
      try {
        if (meter.newReading && meter.newReading !== 0) {
          const lastReading = this.getLastReading(meter)
          if (lastReading !== '-' && meter.newReading < lastReading) {
            notificationStore.showNotification(
              'Новое показание не может быть меньше последнего!',
              'error'
            )
            meter.newReading = lastReading
            return
          }
        } else {
          notificationStore.showNotification('Введите новое показание отличное от нуля', 'error')
          return
        }
        await addReading(meter.$id, meter.newReading)
        notificationStore.showNotification('Показание добавлено', 'success')
        this.$emit('fetchData')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
/* убрать стрелки */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
