import React, { useState, useEffect } from 'react'

// Servicios
import services from '../../services'

// Components
import { Spin, Error } from '../shared'


function Players() {

    const { playerService } = services

    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [players, setPlayers] = useState([])

    const getPlayersAction = async () => {
        setLoading(true)
        try {
            const response = await playerService.getPlayers()
            setPlayers(response)
        } catch (error) {
            console.log(`El error es: ${error}`)
            setHasError(true)
        }
        setLoading(false)
    }

    useEffect(
        () => {
            getPlayersAction()
        }, [])

    return (
        <Spin
            visible={loading}
        >
            <Error
                visible={hasError}
                message='En estos momentos no se pueden obtener los jugadores'
            >
                <ul>
                    {
                        players.map(
                            (player, i) => (
                                <li key={`${player.teamId}-${i}`}>{player.name}</li>
                            )
                        )
                    }
                </ul>
            </Error>
        </Spin>
    )
}

export default Players