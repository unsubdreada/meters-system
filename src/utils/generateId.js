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
    const userIds = response.users.map((user) => parseInt(user.$id))

    const numericIds = userIds.filter((id) => !isNaN(id))

    const maxId = Math.max(...numericIds, 0)

    return (maxId + 1).toString()
  } catch (error) {
    console.log('Не удалось получить список пользователей!', error)
  }
}
