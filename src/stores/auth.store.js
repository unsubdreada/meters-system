import { defineStore } from 'pinia'

export const useIsLoadingStore = defineStore('isLoading', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    set() {
      this.isLoading = true
    },
    clear() {
      this.isLoading = false
    }
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: localStorage.getItem('email') || '',
    name: localStorage.getItem('name') || '',
    status: !!localStorage.getItem('token'),
    userId: localStorage.getItem('userId')
  }),
  getters: {
    isAuth: (state) => state.status
  },
  actions: {
    clear() {
      this.email = ''
      this.name = ''
      this.status = false
      this.userId = ''
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('name')
      localStorage.removeItem('userId')
    },
    set(response) {
      this.status = true
      this.email = response.email
      this.name = response.name
      this.userId = response.$id
      localStorage.setItem('token', response.$idToken)
      localStorage.setItem('email', response.email)
      localStorage.setItem('name', response.name)
      localStorage.setItem('userId', response.$id)
    }
  }
})
