import React, { useState, useEffect, Fragment } from 'react'

// Servicios
import services from '../../services'

// Custom Hooks
import { useIndexedDB } from '../../hooks'

// Custom Hooks
import { messagesConstants as constants } from '../../constants'

// Components
import Player from './components/Player'
import Transfer from './components/Transfer'
import { Spin, Message, Modal } from '../shared'

// Estilos
import styles from './index.module.css'

function Players() {

    const { playerService } = services
    const { ERROR } = constants

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [hasChange, setHasChange] = useState(false)
    const [isOffLine, setIsOffLine] = useState(false)
    const [players, setPlayers] = useState([])
    const [playerSelected, setPlayerSelected] = useState({})
    const [level, setLevel] = useState(ERROR)
    const [message, setMessage] = useState('')
    const [playersFromIdb, setPlayersInIdb] = useIndexedDB('players')


    const getPlayersAction = async () => {
        setLoading(true)
        setIsOffLine(false)
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
            setIsOffLine(true)
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

    const openPlayerDetail = (player) => {
        setPlayerSelected(player)
        toogleModal()
    }

    const toogleModal = () => {
        setVisible(!visible)
    }

    useEffect(
        () => {
            getPlayersAction()
        }, [])

    useEffect(
        () => {
            if (!visible && hasChange) {
                getPlayersAction()
                setHasChange(false)
            }
        }, [visible, hasChange])

    useEffect(
        () => {
            if (isOffLine)
                setData(playersFromIdb)
        }, [isOffLine])

    return (
        <Fragment>
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
                                        openDetailModal={openPlayerDetail}
                                    />
                                )
                            )
                        }
                    </ul>
                </Message>
            </Spin>
            <Modal
                visible={visible}
                closeModal={toogleModal}
                title='Transfer'
            >
                <Transfer
                    modalVisible={visible}
                    playerSelected={playerSelected}
                    players={players}
                    setHasChange={setHasChange}
                />
            </Modal>
        </Fragment>
    )
}

export default Players