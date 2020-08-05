const PichichisService = function (httpClient) {

    // ------------------------------------------

    const getPichichis = async () => {
        const config = httpClient.createConfigForRequest('pichichis', 'GET')
        return await httpClient.request(config)
    }

    // ------------------------------------------

    return Object.freeze({
        getPichichis,
    })
}

export default PichichisService
