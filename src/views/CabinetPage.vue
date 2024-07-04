<template>
  <div class="flex flex-col items-center">
    <div class="fixed top-0 bottom-5 mt-20 w-4/5 bg-[#141F3B] rounded-xl text-center overflow-auto">
      <h1
        class="sticky top-0 bg-[#141F3B]/50 text-2xl font-roboto text-white py-5 backdrop-blur-sm"
      >
        Ваши карточки
      </h1>
      <div class="flex flex-wrap justify-center items-center gap-8">
        <AddressCard
          v-for="address in addresses"
          :key="address.id"
          :address="address"
          :meters="meters[address.$id] || []"
          @clickAddressSettingsModal="showAddressSettingsModal"
          @clickAddReadings="showAddReadingsModal"
          @clickHistory="showHistoryReadingsModal"
          @clickDeleteAddress="showDeleteAddressModal"
        />
        <AddAddressCard @click="showAddAddressModal" />
        <Modal :isVisible="showModal" @close="closeModal">
          <div v-if="showAddressSettings">
            <AddressSettings
              :address="selectedAddress"
              :meters="meters[selectedAddress.$id] || []"
              @close="closeModal"
              @fetchData="fetchData"
            />
          </div>
          <div v-if="showDeleteAddress">
            <DeleteAddress :address="selectedAddress" @close="closeModal" @fetchData="fetchData" />
          </div>
          <div v-if="showAddReadings">
            <AddReadings
              :address="selectedAddress"
              :meters="meters[selectedAddress.$id] || []"
              @close="closeModal"
              @fetchData="fetchData"
            />
            <TableMeters :meters="meters[selectedAddress.$id] || []" @fetchData="fetchData" />
          </div>
          <div v-if="showHistoryReadings">
            <HistoryTable
              :address="selectedAddress"
              :meters="meters[selectedAddress.$id] || []"
              @close="closeModal"
              @fetchData="fetchData"
            />
          </div>
          <div v-if="showAddAddressForm">
            <AddAddressForm @close="closeModal" @fetchData="fetchData" />
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getAddresses, getMeters } from '@/utils/appwrite_db'
import AddressCard from '@/components/layout/AddressCard.vue'
import AddAddressCard from '@/components/layout/AddAddressCard.vue'
import DeleteAddress from '@/views/DeleteAddress.vue'
import Modal from '@/components/layout/Modal.vue'
import AddAddressForm from '@/views/AddAddressForm.vue'
import AddressSettings from '@/views/AddressSettings.vue'
import AddReadings from '@/views/AddReadings.vue'
import TableMeters from '@/views/TableMeters.vue'
import HistoryTable from '@/views/HistoryTable.vue'

export default {
  components: {
    AddressCard,
    AddAddressCard,
    Modal,
    AddAddressForm,
    DeleteAddress,
    AddressSettings,
    AddReadings,
    TableMeters,
    HistoryTable
  },
  setup() {
    const addresses = ref([])
    const meters = ref({})
    const selectedAddress = ref(null)
    const showModal = ref(false)
    const showAddressSettings = ref(false)
    const showAddAddressForm = ref(false)
    const showAddReadings = ref(false)
    const showHistoryReadings = ref(false)
    const showDeleteAddress = ref(false)

    const fetchData = async () => {
      // Получение данных (адреса, счётчики и их показания)
      try {
        const addressesResponse = await getAddresses()
        if (!addressesResponse?.length) {
          return
        }
        addresses.value = addressesResponse

        const metersByAddress = {}
        const metersPromises = addressesResponse.map(async (address) => {
          const metersData = await getMeters(address.addressId)
          if (metersData.documents.length > 0) {
            metersByAddress[address.$id] = metersData.documents
          }
        })

        await Promise.all(metersPromises)
        meters.value = metersByAddress
      } catch (error) {
        console.log('Ошибка получения счётчиков', error)
      }
    }

    onMounted(() => {
      fetchData()
    })

    const showAddAddressModal = () => {
      showModal.value = true
      showAddAddressForm.value = true
      showAddressSettings.value = false
      showAddReadings.value = false
      showHistoryReadings.value = false
      showDeleteAddress.value = false
    }
    const showDeleteAddressModal = (address) => {
      selectedAddress.value = address
      showModal.value = true
      showAddAddressForm.value = false
      showAddressSettings.value = false
      showAddReadings.value = false
      showHistoryReadings.value = false
      showDeleteAddress.value = true
    }
    const showAddressSettingsModal = (address) => {
      selectedAddress.value = address
      showModal.value = true
      showAddAddressForm.value = false
      showAddressSettings.value = true
      showAddReadings.value = false
      showHistoryReadings.value = false
      showDeleteAddress.value = false
    }
    const showAddReadingsModal = (address) => {
      selectedAddress.value = address
      showModal.value = true
      showAddAddressForm.value = false
      showAddressSettings.value = false
      showAddReadings.value = true
      showHistoryReadings.value = false
      showDeleteAddress.value = false
    }
    const showHistoryReadingsModal = (address) => {
      selectedAddress.value = address
      showModal.value = true
      showAddAddressForm.value = false
      showAddressSettings.value = false
      showAddReadings.value = false
      showHistoryReadings.value = true
      showDeleteAddress.value = false
    }
    const closeModal = () => {
      showModal.value = false
    }
    return {
      addresses,
      meters,
      showModal,
      showAddressSettings,
      showDeleteAddress,
      showAddReadings,
      showAddAddressForm,
      showHistoryReadings,
      selectedAddress,
      fetchData,
      showAddAddressModal,
      showDeleteAddressModal,
      showAddressSettingsModal,
      showAddReadingsModal,
      showHistoryReadingsModal,
      closeModal
    }
  }
}
</script>
