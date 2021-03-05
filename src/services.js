import { progress } from '@progress/jsdo-core'

const serviceURI = 'http://localhost:7020/nynweb'
const catalogURI = 'http://localhost:7020/nynweb/static/nynwebService.json'

export const parametrosConsulta = {
    lineasPorPagina: 10,
}

// const serviceURI = 'http://localhost:7030/nynwebInt'
// const catalogURI =
//     'http://localhost:7030/nynwebInt/static/nynwebIntService.json'

export const obtenerConexion = () => {
    return progress.data.getSession({
        serviceURI,
        catalogURI,
        authenticationModel: progress.data.Session.AUTH_TYPE_FORM, // Seguridad con OERealm
        username: 'cicle',
        password: 'cicle_nyn',
    })
}

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
