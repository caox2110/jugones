const TeamsService = function (httpClient) {

    // ------------------------------------------

    const getTeams = async () => {
        const config = httpClient.createConfigForRequest('teams', 'GET')
        return await httpClient.request(config)
    }

    // ------------------------------------------

    return Object.freeze({
        getTeams,
    })
}

export default TeamsService
