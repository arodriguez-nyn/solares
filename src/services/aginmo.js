import { progress } from '@progress/jsdo-core'
import { conectar } from './comun'

export const obtenerRegistrosAginmo = filtro => {
    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'aginmo' })

        return jsdo.fill(filtro).then(
            jsdo => jsdo,
            error => error
        )
    })
}
