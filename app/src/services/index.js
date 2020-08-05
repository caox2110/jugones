// Constantes
import { AppConstants as constants } from '../constants'

// HttpClient para la configuración de peticiones
import HttpClient from './HttpClient'

// Servicios
import PlayerService from './PlayerService'
import PichichisService from './PichichisService'

const Services = () => {

    const httpClient = HttpClient(constants)
    const playerService = PlayerService(httpClient)
    const pichichiService = PichichisService(httpClient)

    return Object.freeze({
        playerService,
        pichichiService
    })
}

export default Services()