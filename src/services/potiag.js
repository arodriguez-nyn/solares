import { progress } from '@progress/jsdo-core'
import { conectar } from './comun'

export const guardaPotiag = (values, registroActual) => {
    const useSubmit = true
    const { numreg, numtic, numotr, fecrec, destin, priori, observ } = values

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'potiag' })
        const dataSet = {
            NUMREG: numreg,
            NUMTIC: numtic,
            NUMOTR: numotr,
            PRIORI: priori,
            FECREC: fecrec,
            DESTIN: destin,
            OBSERV: observ,
        }

        if (!registroActual) {
            // Nuevo registro
            jsdo.add(dataSet)
            return jsdo.saveChanges(useSubmit).then(
                jsdo => jsdo,
                error => error
            )
        } else {
            console.log(jsdo)
            return jsdo
                .fill(`NUMREG = ${registroActual.numreg}`)
                .then(respuesta => {
                    const potiag = jsdo.ttPOTIAG.findById(
                        respuesta.jsdo.getId()
                    )
                    potiag.assign(dataSet)
                    return jsdo.saveChanges(useSubmit)
                })
                .then(
                    jsdo => jsdo,
                    error => error
                )
        }
    })
}

export const borrarPotiag = registroActual => {
    const useSubmit = true
    const { numtic, numotr, priori, destin, fecrec, observ } = registroActual

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'potiag' })
        const dataSet = {
            NUMTIC: numtic,
            NUMOTR: numotr,
            PRIORI: priori,
            DESTIN: destin,
            FECREC: fecrec,
            OBSERV: observ,
        }

        jsdo.fill(`NUMREG = ${registroActual.numreg}`).then(
            respuesta => {
                const potiag = jsdo.ttPOTIAG.findById(respuesta.jsdo.getId())
                potiag.remove(dataSet)

                return jsdo.saveChanges(useSubmit)
            },
            error => error
        )
    })
}

export const obtenerRegistrosPotiag = filtro => {
    return conectar().then(
        respuesta => {
            const { result } = respuesta

            if (result === 1 || result === 3) {
                const jsdo = new progress.data.JSDO({ name: 'potiag' })

                return jsdo.fill(filtro).then(
                    jsdo => {
                        return jsdo
                    },
                    error => {
                        return error
                    }
                )
            } else {
                return result
            }
        },
        error => {
            console.log('error potiag', error)
        }
    )
}
