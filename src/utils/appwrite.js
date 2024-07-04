import { Client, Account, Databases, Query } from 'appwrite'

const client = new Client()

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

export const account = new Account(client)

export const database = new Databases(client)

export const sdk = Query
