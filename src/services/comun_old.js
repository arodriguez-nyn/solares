import { progress } from '@progress/jsdo-core'

const serviceURI = 'http://localhost:7020/nynweb'
const catalogURI = 'http://localhost:7020/nynweb/static/nynwebService.json'
const authenticationModel = progress.data.Session.AUTH_TYPE_FORM
// export const jsdoSession = new progress.data.JSDOSession({
//     catalogURI,
//     authenticationModel,
//     serviceURI,
// })

// const serviceURI = 'http://localhost:7030/nynwebInt'
// const catalogURI =
//     'http://localhost:7030/nynwebInt/static/nynwebIntService.json'

export const obtenerConexion = (username = 'cicle', password = 'cicle_nyn') => {
    return progress.data
        .getSession({
            serviceURI,
            catalogURI,
            authenticationModel,
            username,
            password,
        })
        .then(respuesta => {
            return respuesta
        })
        .catch(error => console.log('error obtenerConexion', error))
}

export const logout = (username = 'cicle', password = 'cicle_nyn') => {
    return progress.data
        .getSession({
            serviceURI,
            catalogURI,
            authenticationModel,
            username,
            password,
        })
        .then(sesion => {
            console.log('Desconectando...', sesion)
            return sesion.jsdosession.logout()
        })
        .then(respuesta => {
            console.log('respuesta', respuesta)
            return respuesta
        })
        .catch(error => {
            console.log('error', error)
        })
}

export const estaConectado = (username = 'cicle', password = 'cicle_nyn') => {
    return progress.data
        .getSession({
            serviceURI,
            catalogURI,
            authenticationModel,
            username,
            password,
        })
        .then(respuesta => {
            const { jsdosession } = respuesta
            return jsdosession.connected
        })
}

export const autenticaUsuario = (
    username = 'cicle',
    password = 'cicle_nyn'
) => {
    return obtenerConexion(username, password)
        .then(respuesta => {
            console.log('conexión obtenida', respuesta)
            return respuesta
            // .login(username, password)
            // .then(respuesta => {
            //     console.log('login', respuesta)
            //     return respuesta
            // })
            // .catch(error => {
            //     console.log('error login', error)
            //     return error
            // })
        })
        .catch(error => {
            console.log('error obtener conexión', error)
            return error
        })
}

// const desconectar = () => {
//     return jsdoSession.logout()
// }

// export const autenticaUsuario = (
//     username = 'cicle',
//     password = 'cicle_nyn'
// ) => {
//     // return desconectar().then(respuesta => {
//     //     console.log('desconectar', respuesta)
//     return obtenerConexion(username, password)
//         .then(respuesta => {
//             console.log('respuesta', respuesta)
//             return respuesta.result
//         })
//         .catch(error => {
//             return error.result
//         })
//     // })
// }

export const contarRegistros = (filtro, tabla) => {
    return obtenerConexion().then(() => {
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

/*export const obtenerRegistros = ({tabla, dataSet, query}) => {
    return obtenerConexion()
    .then(() => {
        const jsdo = new progress.data.JSDO({name: 'cafiso'});
        
        jsdo.fill('TIPFIN = 2')
        .then(jsdo => {    
            const { success, request } = jsdo
            if(success){
                const lista = request.response.dsCAFISO.ttCAFISO
                //const lista = `${request.response}.${dataSet}`
                return lista
            }
        }, () => {
            console.log("Error while reading records.");
        })
    })
}*/
