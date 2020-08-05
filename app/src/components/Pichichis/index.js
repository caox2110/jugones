import React, { useState, useEffect } from 'react'

// Servicios
import services from '../../services'

// Componentes
import { Spin, Error } from '../shared'

// Estilos
import styles from './index.module.css'

function Pichichis({
    modalVisible
}) {

    const { pichichiService } = services

    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [pichichis, setPichichis] = useState([])
    const [direction, setDirection] = useState('sorterDown')

    const getPichichisAction = async () => {
        setLoading(true)
        setHasError(false)
        try {
            const response = await pichichiService.getPichichis()
            setPichichis(response)
        } catch (err) {
            console.log(`El error es: ${err}`)
            setHasError(true)
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

    useEffect(
        () => {
            if (modalVisible)
                getPichichisAction()
        }, [modalVisible])

    return (
        <div className={styles.container}>
            <Spin
                visible={loading}
            >
                <Error
                    visible={hasError}
                    message='En estos momentos no se pueden obtener los pichichis'
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
                </Error>
            </Spin>
        </div>
    )
}

export default Pichichis