<template>
  <div class="flex flex-col items-center gap-2 m-2">
    <div class="flex flex-col items-center gap-2 border-b-2 pb-2 w-full">
      <h1 class="text-xl font-roboto text-white">История показаний</h1>
      <p class="text-sm font-roboto text-white">
        {{ address.city }}, {{ address.street }}, д.{{ address.house }}, кв.{{ address.apartment }}
      </p>
    </div>
    <div class="flex flex-row items-center gap-2" v-if="meters.length > 0">
      <p class="text-lg text-white">Выберите счётчик:</p>
      <select v-model="selectedMeterId" class="bg-[#223054] rounded-xl p-2">
        <option v-for="meter in meters" :key="meter.meterNumber" :value="meter.meterNumber">
          [{{ meter.type }}] {{ meter.name }}
        </option>
      </select>
    </div>
    <div v-else>
      <p>Счётчики отсутствуют</p>
    </div>
  </div>
  <div v-if="selectedMeter" class="max-h-96 overflow-y-scroll">
    <table class="w-full">
      <thead>
        <tr class="sticky top-0 bg-[#223054]">
          <th class="p-2">Тип</th>
          <th class="p-2">Имя</th>
          <th class="p-2">Номер</th>
          <th class="p-2">Дата последнего показания</th>
          <th class="p-2">Последнее показание</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reading, readingId) in parsedReadings" :key="reading.createdAt">
          <td class="p-2">{{ selectedMeter.type }}</td>
          <td class="p-2">{{ selectedMeter.name }}</td>
          <td class="p-2">{{ selectedMeter.meterNumber || '-' }}</td>
          <td class="p-2">
            {{ formatReadingDate(reading.createdAt) || '-' }}
          </td>
          <td class="p-2">{{ reading.readingValue || '-' }}</td>
          <td class="p-2">
            <XMarkIcon
              class="w-5 hover:text-red-500 cursor-pointer"
              @click="handleDeleteReading(seletedMeter, readingId)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { deleteReading } from '@/utils/appwrite_db'
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
  emits: ['close', 'fetchData'],
  data() {
    return {
      selectedMeterId: null
    }
  },
  computed: {
    selectedMeter() {
      return this.meters.find((meter) => meter.meterNumber === this.selectedMeterId)
    },
    parsedReadings() {
      // Парсинг строк показаний
      if (this.selectedMeter && this.selectedMeter.readings) {
        return this.selectedMeter.readings.map((reading) => JSON.parse(reading)).reverse()
      }
      return []
    }
  },
  created() {
    if (this.meters.length > 0) {
      this.selectedMeterId = this.meters[0].meterNumber
    }
  },
  setup() {
    const formatReadingDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    return {
      formatReadingDate
    }
  },
  methods: {
    async handleDeleteReading(readingId) {
      try {
        const readingIndex = this.selectedMeter.readings.findIndex(
          (reading) => reading.readingId === readingId
        )
        if (readingIndex !== -1) {
          const updatedReadings = [...this.selectedMeter.readings]
          updatedReadings.splice(readingIndex, 1)
          this.selectedMeter.readings = updatedReadings
          await deleteReading(this.selectedMeter)
          console.log('Показание удалено')
          this.$emit('fetchData')
        } else {
          console.log(this.updatedReadings)
          console.log('Показание не найдено')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>
