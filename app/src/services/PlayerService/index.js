const PlayerService = function (httpClient) {

  // ------------------------------------------

  const getPlayers = async (params = null) => {
    const config = httpClient.createConfigForRequest('players', 'GET', { params })
    return await httpClient.request(config)
  }

  // ------------------------------------------

  const transferPlayer = async (body = null) => {
    const config = httpClient.createConfigForRequest('transfer', 'POST', { body })
    return await httpClient.request(config)
  }

  // ------------------------------------------

  return Object.freeze({
    getPlayers,
    transferPlayer
  })
}

export default PlayerService
