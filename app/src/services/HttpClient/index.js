
const HttpClient = function ({
    API_BASE_URL,
    REST_API_CALLS_CONFIG
}) {

    const { REQUEST_CONTENT_TYPE } = REST_API_CALLS_CONFIG

    // ------------------------------------------

    const request = async (req) => {
        return fetch(req).then(toJson)
    }

    // ------------------------------------------

    const toJson = (response) => {
        return response.json()
    }

    // ------------------------------------------

    const getHeaders = (contentType) => {
        const headers = {
            'Content-Type': REQUEST_CONTENT_TYPE || 'application/json'
        }
        if (contentType)
            headers['Content-Type'] = contentType
        return { headers }
    }

    // ------------------------------------------

    const getBody = (body) => {
        if (body !== null) {
            return {
                body
            }
        }
        return
    }

    // ------------------------------------------
    /* 
     Parámetros opcionales con valores por defecto  
    */

    const optionalArguments = {
        body: null,
        contentType: null,
    }

    const createConfigForRequest = (
        endpoint,
        method = 'GET',
        oArguments = optionalArguments
    ) => {

        const baseURL = `${API_BASE_URL}/${endpoint}`

        let config = {
            method,
        }

        config = { ...config, ...getHeaders(oArguments.contentType) }
        config = { ...config, ...getBody(oArguments.body) }

        return Object.freeze(new Request(baseURL, config))
    }

    // ------------------------------------------

    return Object.freeze({
        request,
        createConfigForRequest
    })
}

export default HttpClient
