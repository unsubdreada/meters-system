import { defineStore } from 'pinia'
import { Client, Users } from 'node-appwrite'

const client = new Client()

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(import.meta.env.VITE_APPWRITE_API_KEY)

const users = new Users(client)

export const useSearchUserStore = defineStore('searchUser', {
  state: () => ({
    users: [],
    searchUserID: '',
    currentUserID: localStorage.getItem('userId')
  }),
  actions: {
    async getUsersID(userID = '') {
      try {
        if (userID) {
          const response = await users.get(userID)
          this.users = [response]
        } else {
          this.users = []
        }
      } catch (error) {
        console.log('Не удалось получить список пользователей!', error)
        this.users = []
      }
    },
    setSearchUserID(userId) {
      this.searchUserID = userId
    }
  }
})
