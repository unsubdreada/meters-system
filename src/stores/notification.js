import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    message: '',
    type: '',
    show: false
  }),
  actions: {
    showNotification(message, type) {
      this.message = message
      this.type = type
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 5000)
    }
  }
})
