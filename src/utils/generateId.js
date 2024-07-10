import { Client, Users } from 'node-appwrite'

const client = new Client()

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(import.meta.env.VITE_APPWRITE_API_KEY)

const users = new Users(client)

export const generateId = async () => {
  try {
    const response = await users.list()
    const userIds = response.users.map((user) => user.$id)
    let maxId = 0

    for (let userId of userIds) {
      if (userId.startsWith('id')) {
        const num = parseInt(userId.slice(2))
        if (!isNaN(num) && num > maxId) {
          maxId = num
        }
      }
    }

    return `id${maxId + 1}`
  } catch (error) {
    console.log('Не удалось получить список пользователей!', error)
  }
}
