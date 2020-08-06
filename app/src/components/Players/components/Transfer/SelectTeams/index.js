import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// Servicios
import services from '../../../../../services'

// Custom Hooks
import { messagesConstants as constants } from '../../../../../constants'

// Componentes
import { Select, Option } from '../../../../shared'

function SelectTeams({
    modalVisible,
    loading,
    hasChange,
    teamId,
    teams,
    setTeams,
    setTeamId,
    setLoading,
    setMessageConfig
}) {

    const { teamsService } = services
    const { ERROR } = constants

    const getTeamsAction = async () => {
        setLoading(true)
        try {
            const response = await teamsService.getTeams()
            setTeams(response)
        } catch (err) {
            console.log(`El error es: ${err}`)
            setMessageConfig(
                'En estos momentos no se pueden obtener los equipos del servidor.',
                ERROR
            )
        }
        setLoading(false)
    }

    const handleSelectEvent = (event) => {
        const { target: { value } } = event
        setTeamId(value)
    }

    useEffect(
        () => {
            if (modalVisible && !loading) {
                getTeamsAction()
            }
        }, [modalVisible])

    useEffect(
        () => {
            if (modalVisible && hasChange) {
                getTeamsAction()
            }
        }, [hasChange])

    return (
        <Select
            label="Elegir Equipo"
            name="teams"
            onChange={handleSelectEvent}
            value={teamId}
            disabled={loading}
        >
            <Option
                value=""
            >
                Seleccionar
                    </Option>
            {
                teams.map(t => (
                    <Option
                        key={t.id}
                        value={t.id}
                    >
                        {t.name}
                    </Option>
                ))
            }
        </Select>
    )
}

SelectTeams.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    hasChange: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    teamId: PropTypes.string.isRequired,
    teams: PropTypes.array.isRequired,
    setTeams: PropTypes.func.isRequired,
    setTeamId: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    setMessageConfig: PropTypes.func.isRequired
}

export default SelectTeams