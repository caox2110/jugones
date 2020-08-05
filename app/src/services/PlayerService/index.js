const PlayerService = function (httpClient) {

  // ------------------------------------------

  const getPlayers = async () => {
    const config = httpClient.createConfigForRequest('players','GET')
    return await httpClient.request(config)
  }

  // ------------------------------------------

  return Object.freeze({
    getPlayers,
  })
}

export default PlayerService
