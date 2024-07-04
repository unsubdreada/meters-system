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
    // email: '',
    // name: '',
    // status: !!localStorage.getItem('token')
    email: localStorage.getItem('email') || '',
    name: localStorage.getItem('name') || '',
    status: !!localStorage.getItem('token')
  }),
  getters: {
    // isAuth: (state) => state.status
    isAuth: (state) => state.status
  },
  actions: {
    clear() {
      this.email = ''
      this.name = ''
      this.status = false
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('name')
    },
    set(response) {
      this.status = true
      this.email = response.email
      this.name = response.name
      localStorage.setItem('token', response.$idToken)
      localStorage.setItem('email', response.email)
      localStorage.setItem('name', response.name)
    }
  }
})
