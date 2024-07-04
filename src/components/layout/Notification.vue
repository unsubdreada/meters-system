<template>
  <div
    v-if="show"
    :class="{
      'bg-rose-400 shadow-rose-900': type === 'error',
      'bg-lime-500 shadow-lime-400': type === 'success'
    }"
    class="flex fixed justify-center max-w-max max-h-max items-center m-5 inset-0 z-10 mx-auto rounded-md shadow-lg"
  >
    <div
      :class="{
        'border-red-600': type === 'error',
        'border-emerald-900': type === 'success'
      }"
      class="flex text-center p-2"
    >
      <div v-if="type === 'error'">
        <ExclamationTriangleIcon class="w-10 text-red-950 drop-shadow-md" />
      </div>
      <div v-else><CheckBadgeIcon class="w-10 text-slate-100 drop-shadow-md" /></div>
    </div>
    <div class="p-2 text-center">
      <h1
        :class="{
          'text-red-950': type === 'error',
          'text-slate-100': type === 'success'
        }"
        class="text-lg font-bold"
      >
        {{ type === 'error' ? 'Ошибка' : 'Готово' }}
      </h1>
      <p :class="{ 'text-red-950': type === 'error', 'text-slate-100': type === 'success' }">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'
export default {
  setup() {
    const notificationStore = useNotificationStore()
    const show = computed(() => notificationStore.show)
    const message = computed(() => notificationStore.message)
    const type = computed(() => notificationStore.type)
    return {
      show,
      message,
      type
    }
  }
}
</script>
