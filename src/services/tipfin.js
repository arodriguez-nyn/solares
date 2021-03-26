import { progress } from '@progress/jsdo-core'
import { obtenerConexion } from './comun'

export const obtenerRegistrosTipfin = filtro => {
    return obtenerConexion().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'tipfin' })

        return jsdo.fill(filtro).then(
            jsdo => jsdo,
            error => error
        )
    })
}
