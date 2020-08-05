import React, { useState, useEffect } from 'react'

// Servicios
import services from '../../services'

// Custom Hooks
import { useIndexedDB } from '../../hooks'

// Custom Hooks
import { messagesConstants as constants } from '../../constants'

// Components
import Player from './components/Player'
import { Spin, Message } from '../shared'

// Estilos
import styles from './index.module.css'

function Players() {

    const { playerService } = services
    const { ERROR } = constants

    const [loading, setLoading] = useState(false)
    const [players, setPlayers] = useState([])
    const [level, setLevel] = useState(ERROR)
    const [message, setMessage] = useState('')
    const [playersFromIdb, setPlayersInIdb] = useIndexedDB('players')

    const getPlayersAction = async () => {
        setLoading(true)
        setMessageConfig()
        try {
            const response = await playerService.getPlayers()
            setData(response)
        } catch (err) {
            console.log(`El error es: ${err}`)
            setMessageConfig(
                'En estos momentos no se pueden obtener los jugadores del servidor.',
                ERROR
            )
        }
        setLoading(false)
    }

    const setData = (data = []) => {
        setPlayers(data)
        setPlayersInIdb(data)
    }

    const setMessageConfig = (msg = '', lvl = ERROR) => {
        setLevel(lvl)
        setMessage(msg)
    }

    useEffect(
        () => {
            getPlayersAction()
        }, [])

    useEffect(
        () => {
            if (playersFromIdb)
                setData(playersFromIdb)
        }, [playersFromIdb])

    return (
        <Spin
            visible={loading}
        >
            <Message
                visible={(message.length > 0)}
                message={message}
                level={level}
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
            </Message>
        </Spin>
    )
}

export default Players