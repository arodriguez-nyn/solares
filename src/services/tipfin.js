import { progress } from '@progress/jsdo-core'
import { conectar } from './comun'

export const obtenerRegistrosTipfin = filtro => {
    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'tipfin' })

        return jsdo.fill(filtro).then(
            jsdo => jsdo,
            error => error
        )
    })
}
