<template>
  <div
    class="flex flex-col items-center justify-between min-h-[300px] space-y-2 bg-[#223054] px-4 py-2 rounded-xl h-full min-w-[200px] font-roboto text-white hover:bg-[#374A7C] hover:cursor-pointer transition duration-100 shadow-xl"
  >
    <div class="border-b-2 pb-2">
      <h1 class="text-2xl">{{ address.city }}</h1>
      <p class="text-lg">{{ address.street }}</p>
      <p class="text-lg">д.{{ address.house }}, кв.{{ address.apartment }}</p>
    </div>
    <div>
      <h1 class="text-m">Кол-во счётчиков:</h1>
      <p class="text-m">{{ meters.length }}</p>
    </div>
    <div class="flex justify-between gap-5">
      <PencilSquareIcon class="w-10 hover:text-lime-400" @click="handleClickAddReadings(address)" />
      <TableCellsIcon class="w-10 hover:text-yellow-400" @click="handleClickHistory(address)" />
    </div>
    <div class="flex w-full justify-between">
      <TrashIcon
        class="w-10 text-[#070e20] hover:text-red-500"
        @click="handleClickDeleteAddress(address)"
      />
      <Cog8ToothIcon
        class="w-10 text-[#070e20] hover:text-[#49BADE]"
        @click="handleClickAddressSettings(address)"
      />
    </div>
  </div>
</template>

<script>
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
  methods: {
    handleClickAddressSettings() {
      this.$emit('clickAddressSettingsModal', this.address)
    },
    handleClickAddReadings() {
      this.$emit('clickAddReadings', this.address)
    },
    handleClickHistory() {
      this.$emit('clickHistory', this.address)
    },
    handleClickDeleteAddress() {
      this.$emit('clickDeleteAddress', this.address)
    }
  }
}
</script>
