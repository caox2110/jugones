// Constantes
import { AppConstants as constants } from '../constants'

const { INDEX_DB_CONFIG: { INDEXDB_BD_NAME, INDEXDB_BD_VERSION, INDEXDB_TABLE_NAME } } = constants

const dbp = new Promise((resolve, reject) => {
    const openreq = window.indexedDB.open(INDEXDB_BD_NAME, INDEXDB_BD_VERSION)
    openreq.onerror = () => reject(openreq.error)
    openreq.onsuccess = () => resolve(openreq.result)
    openreq.onupgradeneeded = () => openreq.result.createObjectStore(INDEXDB_TABLE_NAME)
})

export const call = async (type, method, ...args) => {
    const db = await dbp
    const transaction = db.transaction(INDEXDB_TABLE_NAME, type)
    const store = transaction.objectStore(INDEXDB_TABLE_NAME)

    return new Promise((resolve, reject) => {
        const req = store[method](...args)
        transaction.oncomplete = () => resolve(req)
        transaction.onabort = transaction.onerror = () => reject(transaction.error)
    })
}

export const get = async key => (await call('readonly', 'get', key)).result
export const set = (key, value) =>
    value === undefined
        ? call('readwrite', 'delete', key)
        : call('readwrite', 'put', value, key)