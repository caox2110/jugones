// Constantes
import { AppConstants as constants } from '../constants'

// HttpClient para la configuración de peticiones
import HttpClient from './HttpClient'

// Servicios
import PlayerService from './PlayerService'
import PichichisService from './PichichisService'
import TeamsService from './TeamsService'

const Services = () => {

    const httpClient = HttpClient(constants)
    const playerService = PlayerService(httpClient)
    const pichichiService = PichichisService(httpClient)
    const teamsService = TeamsService(httpClient)

    return Object.freeze({
        playerService,
        pichichiService,
        teamsService
    })
}

export default Services()