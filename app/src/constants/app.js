
const NODE_ENV = process.env.NODE_ENV

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001'
const REQUEST_CONTENT_TYPE = process.env.REQUEST_CONTENT_TYPE || 'application/json'
const INDEXDB_BD_VERSION = process.env.INDEXDB_BD_VERSION || 1
const INDEXDB_BD_NAME = process.env.INDEXDB_BD_NAME || 'JugonesDB'
const INDEXDB_TABLE_NAME = process.env.INDEXDB_TABLE_NAME || 'Data'

export const AppConstants = {
  API_BASE_URL,
  REST_API_CALLS_CONFIG: {
    REQUEST_CONTENT_TYPE
  },
  INDEX_DB_CONFIG: {
    INDEXDB_BD_VERSION,
    INDEXDB_BD_NAME,
    INDEXDB_TABLE_NAME
  }
}

if (NODE_ENV === 'development') {
  console.log("Constants are", AppConstants)
  console.log("ENV is ", NODE_ENV)
}