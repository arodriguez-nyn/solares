import { progress } from '@progress/jsdo-core'
import { conectar } from './comun'

export const obtenerRegistrosUsuari = filtro => {
    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'usuari' })

        return jsdo.fill(filtro).then(
            jsdo => jsdo,
            error => error
        )
    })
}

// export const compruebaUsuario = (usuario, password) => {
//     return conectar().then(() => {
//         const jsdo = new progress.data.JSDO({ name: 'usuari' })

//         return jsdo.invoke('checkusuario', usuario, password).then(
//             jsdo => {
//                 if (jsdo.success) {
//                     //const numeroRegistros = jsdo.request.response.numRecs
//                     return jsdo
//                 }
//             },
//             error => {
//                 console.log('error', error)
//             }
//         )
//     })
// }
