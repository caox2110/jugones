import React, { useState, useEffect } from 'react'

// Servicios
import services from '../../services'

// Custom Hooks
import { useIndexedDB } from '../../hooks'

// Custom Hooks
import { messagesConstants as constants } from '../../constants'

// Componentes
import { Spin, Message } from '../shared'

// Estilos
import styles from './index.module.css'

function Pichichis({
    modalVisible
}) {

    const { pichichiService } = services
    const { ERROR } = constants

    const [loading, setLoading] = useState(false)
    const [isOffLine, setIsOffLine] = useState(false)
    const [level, setLevel] = useState(ERROR)
    const [message, setMessage] = useState('')
    const [pichichis, setPichichis] = useState([])
    const [direction, setDirection] = useState('sorterDown')
    const [pichichisFromIdb, setPichichisInIdb] = useIndexedDB('pichichis')

    const getPichichisAction = async () => {
        setLoading(true)
        setIsOffLine(false)
        setMessageConfig()
        try {
            const response = await pichichiService.getPichichis()
            setData(response)
        } catch (err) {
            console.log(`El error es: ${err}`)
            setMessageConfig(
                'En estos momentos no se pueden obtener los pichichis del servidor.',
                ERROR
            )
            setIsOffLine(true)
        }
        setLoading(false)
    }

    const sorterAction = (e) => {
        e.preventDefault()
        let results = []
        switch (direction) {
            case 'sorterUp':
                results = [...pichichis].sort((p1, p2) => { return p1.goals - p2.goals })
                break
            default:
                results = [...pichichis].sort((p1, p2) => { return p2.goals - p1.goals })
                break
        }
        setDirection(direction === 'sorterDown' ? 'sorterUp' : 'sorterDown')
        setPichichis(results)
    }

    const setData = (data = []) => {
        setPichichis(data)
        setPichichisInIdb(data)
    }

    const setMessageConfig = (msg = '', lvl = ERROR) => {
        setLevel(lvl)
        setMessage(msg)
    }

    useEffect(
        () => {
            if (modalVisible)
                getPichichisAction()
        }, [modalVisible])

    useEffect(
        () => {
            if (isOffLine)
                setData(pichichisFromIdb)
        }, [isOffLine])

    return (
        <div className={styles.container}>
            <Spin
                visible={loading}
            >
                <Message
                    visible={(message.length > 0)}
                    message={message}
                    level={level}
                >
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tr}>
                                <th className={styles.th}>Nombre</th>
                                <th className={`${styles.th} `}>
                                    Goles
                                    <a
                                        href='#!'
                                        className={`${styles[direction]}`}
                                        onClick={sorterAction}
                                    >
                                        &nbsp;
                                     </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pichichis.length ?
                                    (
                                        pichichis.map(
                                            pichichi => {
                                                const { player: { id, name }, goals } = pichichi
                                                return (
                                                    <tr
                                                        className={styles.tr}
                                                        key={`${id}`}
                                                    >
                                                        <td className={styles.td}>{name}</td>
                                                        <td className={styles.td}>{goals}</td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                className={styles.td}
                                                colSpan='2'
                                            >
                                                No existen datos para mostrar
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </Message>
            </Spin>
        </div>
    )
}

export default Pichichis