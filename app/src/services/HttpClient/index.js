
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

    const getParams = (baseURL, params) => {
        if (params) {
            let url = new URL(baseURL)
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            return url
        }
        return baseURL
    }

    // ------------------------------------------

    const getBody = (body) => {
        if (body !== null)
            return { body: JSON.stringify(body) }
        return
    }

    // ------------------------------------------
    /* 
     Parámetros opcionales con valores por defecto  
    */

    const optionalArguments = {
        body: null,
        params: null,
        contentType: null
    }

    const createConfigForRequest = (
        endpoint,
        method = 'GET',
        oArguments = optionalArguments
    ) => {
        
        let baseURL = `${API_BASE_URL}/${endpoint}`

        let config = { method }

        config = { ...config, ...getHeaders(oArguments.contentType) }
        config = { ...config, ...getBody(oArguments.body) }
        baseURL = getParams(baseURL, oArguments.params)

        return Object.freeze(new Request(baseURL, config))
    }

    // ------------------------------------------

    return Object.freeze({
        request,
        createConfigForRequest
    })
}

export default HttpClient
