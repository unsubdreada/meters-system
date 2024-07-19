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
        class="bg-[#223054] rounded-2xl p-2 outline-none"
        v-model="meterData.name"
      />
      <input
        type="text"
        placeholder="Номер счётчика"
        class="bg-[#223054] rounded-2xl p-2 outline-none"
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
  <div v-if="meters.length > 0" class="border-t-2 border-[#374A7C] p-2">
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

  <div class="border-t-2 border-[#374A7C] p-2">
    <h2 class="text-xl font-roboto text-white">Поделиться адресом</h2>
    <div class="flex gap-3 items-center justify-center">
      <p>Введите ID для поиска пользователя:</p>
      <input
        type="text"
        v-model="searchUserID"
        @input="updateSearch"
        class="bg-[#223054] rounded-xl p-2 outline-none"
      />
    </div>
    <div class="max-h-96 overflow-y-scroll" v-if="searchUserStore.users.length > 0">
      <p>Найденные пользователи:</p>
      <div
        class="flex flex-row gap-4 justify-center py-2"
        v-for="user in searchUserStore.users"
        :key="user.$id"
      >
        <p>
          [ {{ user.$id === searchUserStore.currentUserID ? 'Это Вы' : user.$id }} ] {{ user.name }}
        </p>
        <ShareIcon
          v-if="user.$id !== searchUserStore.currentUserID"
          class="w-6 h-6 hover:text-blue-500 cursor-pointer"
          @click="shareAddress(user.$id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useNotificationStore } from '@/stores/notification'
import { useSearchUserStore } from '@/stores/searchUser.store'
import { deleteMeters, shareAddress } from '@/utils/appwrite_db'
import { addMeters } from '@/utils/appwrite_db'
import { watch, ref } from 'vue'

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
  setup() {
    const searchUserStore = useSearchUserStore()
    const searchUserID = ref(searchUserStore.searchUserID)

    watch(searchUserID, async (newUserID) => {
      await searchUserStore.getUsersID(newUserID)
    })

    const updateSearch = () => {
      searchUserStore.setSearchUserID(searchUserID.value)
      if (searchUserID.value === '') {
        searchUserStore.users = []
      }
    }

    return { searchUserStore, updateSearch, searchUserID }
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
    },
    async shareAddress(userID) {
      const notificationStore = useNotificationStore()
      try {
        await shareAddress(this.address.$id, userID)
        this.$emit('fetchData')
        notificationStore.showNotification(
          `Вы успешно поделились адресом с пользователем ID: ${userID}`,
          'success'
        )
      } catch (error) {
        notificationStore.showNotification('Произошла ошибка при поделении адреса', 'error')
      }
    }
  }
}
</script>
