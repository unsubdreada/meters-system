import { ID } from 'appwrite'
import { account, database, sdk } from '../utils/appwrite'

const dbID = import.meta.env.VITE_APPWRITE_DB_ID
const collectionAddresses = import.meta.env.VITE_APPWRITE_COLLECTION_ADDRESSES
const collectionMeters = import.meta.env.VITE_APPWRITE_COLLECTION_METERS

async function getUserID() {
  try {
    const user = await account.get()
    return user.$id
  } catch (error) {
    console.log('Ошибка при получении ID пользователя', error)
    return null
  }
}

// РАБОТА С АДРЕСАМИ
// ДОБАВЛЕНИЕ АДРЕСА
async function addAddress(address) {
  const userID = await getUserID()
  if (userID) {
    try {
      const response = await database.createDocument(dbID, collectionAddresses, ID.unique(), {
        userID: userID,
        createdAt: new Date().toISOString(),
        addressId: ID.unique(),
        ...address // Разбор объекта address
      })
      return response
    } catch (error) {
      console.log('Ошибка при добавлении адреса', error)
    }
  }
}
// УДАЛЕНИЕ АДРЕСА
async function deleteAddress(address) {
  const userID = await getUserID()
  if (userID) {
    try {
      const response = await database.deleteDocument(dbID, collectionAddresses, address)
      return response
    } catch (error) {
      console.log('Ошибка при удалении адреса', error)
    }
  }
}
// ПОЛУЧЕНИЕ АДРЕСОВ
async function getAddresses() {
  const userID = await getUserID()
  if (userID) {
    try {
      const response = await database.listDocuments(dbID, collectionAddresses, [
        sdk.equal('userID', userID)
      ])
      // console.log('Адреса успешно получены')
      return response.documents
    } catch (error) {
      console.log('Ошибка при получении адресов', error)
    }
  }
}

// РАБОТА СО СЧЕТЧИКАМИ
// ДОБАВЛЕНИЕ СЧЕТЧИКА
async function addMeters(addressId, meterData) {
  try {
    const response = await database.createDocument(dbID, collectionMeters, ID.unique(), {
      createdAt: new Date().toISOString(),
      addressId: addressId,
      ...meterData
    })
    return response
  } catch (error) {
    console.log('Ошибка при добавлении счётчика', error)
  }
}
// УДАЛЕНИЕ СЧЕТЧИКА
async function deleteMeters(meterNumber) {
  try {
    const response = await database.deleteDocument(dbID, collectionMeters, meterNumber)
    return response
  } catch (error) {
    console.log('Ошибка при удалении счётчика', error)
  }
}
// ПОЛУЧЕНИЕ СЧЕТЧИКОВ
async function getMeters(addressId) {
  try {
    const response = await database.listDocuments(dbID, collectionMeters, [
      sdk.equal('addressId', addressId)
    ])
    return response
  } catch (error) {
    console.log('Ошибка при получении счётчиков', error)
  }
}

// РАБОТА С ПОКАЗАНИЯМИ
// ДОБАВЛЕНИЕ ПОКАЗАНИЯ
async function addReading(meterNumber, readingValue) {
  try {
    const meter = await database.getDocument(dbID, collectionMeters, meterNumber)
    const updatedReadings = meter.readings || []
    const newReading = {
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      readingValue: readingValue,
      readingId: ID.unique()
    }
    updatedReadings.push(JSON.stringify(newReading))
    const response = await database.updateDocument(dbID, collectionMeters, meterNumber, {
      readings: updatedReadings
    })
    return response
  } catch (error) {
    console.log('Ошибка при добавлении показания', error)
  }
}

async function deleteReading(meter) {
  try {
    const response = await database.updateDocument(dbID, collectionMeters, meter.$id, {
      readings: meter.readings
    })
    console.log('Показание удалено')
    return response
  } catch (error) {
    console.log('Ошибка при удалении показания', error)
  }
}

export {
  addAddress,
  deleteAddress,
  getAddresses,
  addMeters,
  deleteMeters,
  getMeters,
  addReading,
  deleteReading
}
