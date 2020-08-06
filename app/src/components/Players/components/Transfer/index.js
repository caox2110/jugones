import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Servicios
import services from '../../../../services'

// Custom Hooks
import { messagesConstants as constants } from '../../../../constants'

// Componentes
import SelectTeams from './SelectTeams'
import SelectPlayers from './SelectPlayers'
import Money from './Money'
import { Spin, Message } from '../../../shared'

// Estilos
import styles from './index.module.css'

function Transfer({
    modalVisible,
    setHasChange,
}) {

    const { playerService } = services
    const { SUCCESS, ERROR } = constants

    const [loading, setLoading] = useState(false)
    const [level, setLevel] = useState(ERROR)
    const [message, setMessage] = useState('')

    const [teams, setTeams] = useState([])
    const [players, setPlayers] = useState([])
    const [teamId, setTeamId] = useState('')
    const [playerId, setPlayerId] = useState('')
    const [money, setMoney] = useState(0)

    const transferPlayerAction = async () => {
        setLoading(true)
        setMessageConfig()
        try {
            const response = await playerService.transferPlayer({ teamId, playerId })
            manageTranferPlayerResponse(response)
        } catch (err) {
            console.log(`El error es: ${err}`)
            setMessageConfig(
                'En estos momentos no se pueden realizar el tranfer de los jugadores.',
                ERROR
            )
        }
        setLoading(false)
    }

    const manageTranferPlayerResponse = (resp) => {
        let msgObj = { msg: '', lvl: ERROR }
        if (resp && !Object.keys(resp).length) {
            msgObj = { ...msgObj, msg: 'Transfer con éxito.', lvl: SUCCESS }
            cleanForm()
            setHasChange(true)
        } else
            msgObj = { ...msgObj, msg: resp.message, lvl: ERROR }
        setMessageConfig(
            msgObj.msg,
            msgObj.lvl
        )
    }

    const cleanForm = () => {
        setTeamId('')
        setPlayerId('')
    }

    const setMessageConfig = (msg = '', lvl = ERROR) => {
        setLevel(lvl)
        setMessage(msg)
    }

    const handleSubmitEvent = (event) => {
        event.preventDefault()
        transferPlayerAction()
    }

    useEffect(
        () => {
            const tm = teams.find(t => teamId === t.id)
            setMoney(tm ? tm.money : 0)
        }, [teamId])

    useEffect(
        () => {
            if (modalVisible) {
                setTeamId('')
                setPlayerId('')
                setMessageConfig()
            }
        }, [modalVisible])

    return (
        <form
            onSubmit={handleSubmitEvent}
            className={styles.form}
        >
            <Message
                visible={(message.length > 0)}
                message={message}
                level={level}
            >
                <SelectTeams
                    modalVisible={modalVisible}
                    loading={loading}
                    teamId={teamId}
                    teams={teams}
                    setTeamId={setTeamId}
                    setTeams={setTeams}
                    setLoading={setLoading}
                    setMessageConfig={setMessageConfig}
                />
                <SelectPlayers
                    loading={loading}
                    teamId={teamId}
                    teams={teams}
                    playerId={playerId}
                    players={players}
                    setPlayers={setPlayers}
                    setPlayerId={setPlayerId}
                    setLoading={setLoading}
                    setMessageConfig={setMessageConfig}
                />
                <Money
                    money={money}
                />
                <div className={styles.containerButton}>
                    <Spin
                        visible={loading}
                    >
                        <button
                            type="submit"
                            className={styles.buttonSend}
                            disabled={!teamId || !playerId}
                        >
                            aceptar
                </button>
                    </Spin>
                </div>
            </Message>
        </form>
    )
}

Transfer.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    setHasChange: PropTypes.func.isRequired
}

export default Transfer