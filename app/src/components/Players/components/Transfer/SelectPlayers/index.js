import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// Servicios
import services from '../../../../../services'

// Custom Hooks
import { messagesConstants as constants } from '../../../../../constants'

// Componentes
import { Select, Option } from '../../../../shared'

function SelectPlayers({
    loading,
    teamId,
    playerId,
    players,
    teams,
    setPlayers,
    setPlayerId,
    setLoading,
    setMessageConfig
}) {

    const { playerService } = services
    const { ERROR } = constants

    const getPlayersAction = async () => {
        setLoading(true)
        try {
            const response = await playerService.getPlayers({ teamId })
            setPlayers(response)
        } catch (err) {
            console.log(`El error es: ${err}`)
            setMessageConfig(
                'En estos momentos no se pueden obtener los jugadores del servidor.',
                ERROR
            )
        }
        setLoading(false)
    }

    const handleSelectEvent = (event) => {
        const { target: { value } } = event
        setPlayerId(value)
    }

    useEffect(
        () => {
            const tm = teams.find(t => teamId === t.id)
            setPlayerId('')
            if (tm && !loading)
                getPlayersAction()
        }, [teamId])

    return (
        <Select
            label="Elegir Players"
            name="players"
            onChange={handleSelectEvent}
            value={playerId}
            disabled={loading || !players.length || !teamId}
        >
            <Option
                value=""
            >
                Seleccionar
                    </Option>
            {
                players.map(plr => (
                    <Option
                        key={plr.id}
                        value={plr.id}
                    >
                        {plr.name}
                    </Option>
                ))
            }
        </Select>
    )
}

SelectPlayers.propTypes = {
    loading: PropTypes.bool.isRequired,
    teamId: PropTypes.string.isRequired,
    playerId: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
    teams: PropTypes.array.isRequired,
    setPlayers: PropTypes.func.isRequired,
    setPlayerId: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    setMessageConfig: PropTypes.func.isRequired
}

export default SelectPlayers