import React, { useState, useEffect } from 'react'

// Servicios
import services from '../../services'

// Components
import Player from '../Player'
import { Spin, Error } from '../shared'

// Estilos
import styles from './index.module.css'

function Players() {

    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [players, setPlayers] = useState([])

    const getPlayersAction = async () => {
        const { playerService } = services
        setLoading(true)
        setHasError(false)
        try {
            const response = await playerService.getPlayers()
            setPlayers(response)
        } catch (err) {
            console.log(`El error es: ${err}`)
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
                <ul className={styles.cardContainer}>
                    {
                        players.map(
                            (player, i) => (
                                <Player
                                    key={`${player.teamId}-${i}`}
                                    player={player}
                                />
                            )
                        )
                    }
                </ul>
            </Error>
        </Spin>
    )
}

export default Players