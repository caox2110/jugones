const getPlayer = (playerId, teams = []) => {
  var player
  var team = teams.find(t => {
    player = t.players.find(p => p.id === playerId)
    return player
  })

  if (player && team) {
    return { player, teamId: team.id }
  }

  return false
}

const removeByObjectAttribute = function (attribute, value, source = []) {
  var i = source.length
  while (i--) {
    if (source[i]
      && source[i].hasOwnProperty(attribute)
      && (arguments.length > 2 && source[i][attribute] === value)) {
      source.splice(i, 1)
    }
  }
  return source
}

module.exports = {
  getPlayer,
  removeByObjectAttribute
}
