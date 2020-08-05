// Constantes
import { AppConstants as constants } from '../constants'

// HttpClient para la configuración de peticiones
import HttpClient from './HttpClient'

// Servicios
import PlayerService from './PlayerService'

const Services = () => {

    const httpClient = HttpClient(constants)
    const playerService = PlayerService(httpClient)

    return Object.freeze({
        playerService,
    })
}

export default Services()