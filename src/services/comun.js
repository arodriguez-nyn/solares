import { progress } from '@progress/jsdo-core'

const serviceURI = 'http://localhost:7020/nynweb'
const catalogURI = 'http://localhost:7020/nynweb/static/nynwebService.json'
const authenticationModel = progress.data.Session.AUTH_TYPE_FORM
const name = 'sesionActualKey'

let sesionActual

export const conectar = (username = '', password = '') => {
    return progress.data
        .getSession({
            name,
            serviceURI,
            authenticationModel,
            catalogURI,
            username,
            password,
        })
        .then(respuesta => {
            sesionActual = respuesta
            return respuesta
        })
        .catch(error => {
            console.log('Error al iniciar sesión', error)
            return error
        })
}

export const contarRegistros = (filtro, tabla) => {
    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: tabla })
        //const filter = { filter: 'TIPFIN = 2' }
        const ablFilter = { filter: filtro }

        return jsdo.invoke('count', ablFilter).then(
            jsdo => {
                if (jsdo.success) {
                    const numeroRegistros = jsdo.request.response.numRecs
                    return numeroRegistros
                }
            },
            error => {
                console.log(error)
            }
        )
    })
}

export const cerrarSesion = () => {
    return sesionActual.jsdosession.invalidate()
}
