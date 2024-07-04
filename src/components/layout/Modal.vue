<template>
  <div
    class="fixed flex items-center justify-center inset-0 z-10 bg-black/50 backdrop-blur-sm"
    v-if="isVisible"
  >
    <div class="bg-[#141F3B] max-w-full mx-auto text-white rounded-xl shadow-xl shadow-slate-800">
      <div class="flex justify-end p-2">
        <XMarkIcon
          class="w-6 h-6 text-white hover:text-[#49BADE] hover:cursor-pointer"
          @click="closeModal"
        />
      </div>
      <div class="p-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>
