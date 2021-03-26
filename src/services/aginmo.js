import { progress } from '@progress/jsdo-core'
import { obtenerConexion } from './comun'

export const obtenerRegistrosAginmo = filtro => {
    return obtenerConexion().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'aginmo' })

        return jsdo.fill(filtro).then(
            jsdo => jsdo,
            error => error
        )
    })
}
