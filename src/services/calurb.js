import { progress } from '@progress/jsdo-core'
import { conectar } from './comun'

export const obtenerRegistrosCalurb = filtro => {
    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'calurb' })

        return jsdo.fill(filtro).then(
            jsdo => jsdo,
            error => error
        )
    })
}
