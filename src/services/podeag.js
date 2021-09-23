import { progress } from '@progress/jsdo-core'
import { conectar } from './comun'

export const obtenerRegistrosPodeag = filtro => {
    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'podeag' })

        return jsdo.fill(filtro).then(
            jsdo => jsdo,
            error => error
        )
    })
}
