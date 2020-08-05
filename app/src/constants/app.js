
const NODE_ENV = process.env.NODE_ENV

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001'
const REQUEST_CONTENT_TYPE = process.env.REQUEST_CONTENT_TYPE || 'application/json'

export const AppConstants = {
  API_BASE_URL,
  REST_API_CALLS_CONFIG: {
    REQUEST_CONTENT_TYPE
  },
}

if (NODE_ENV === 'development') {
  console.log("Constants are", AppConstants)
  console.log("ENV is ", NODE_ENV)
}