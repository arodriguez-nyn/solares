import { progress } from '@progress/jsdo-core'
import { conectar } from './comun'

export const guardarCafiso = (values, registroActual) => {
    const useSubmit = true
    const {
        ficgen,
        direcc,
        numfic,
        locali,
        prosol,
        tipfin,
        califi,
        calurb,
        supsol,
        profed,
        arm,
        longfa,
        edacsr,
        edacbr,
        edposr,
        edpobr,
    } = values

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'cafiso' })
        const dataSet = {
            NUMFIC: numfic,
            DIRECC: direcc,
            LOCALI: locali,
            TIPFIN: tipfin,
            CALIFI: califi,
            CALURB: calurb,
            EDACSR: edacsr,
            EDACBR: edacbr,
            EDPOSR: edposr,
            EDPOBR: edpobr,
            PROSOL: prosol,
            SUPSOL: supsol,
            ARM: arm,
            PROFED: profed,
            LONGFA: longfa,
            FICGEN: ficgen,
        }

        if (!registroActual) {
            // Nuevo registro
            jsdo.add(dataSet)
            return jsdo.saveChanges(useSubmit).then(
                jsdo => jsdo,
                error => error
            )
        } else {
            return jsdo
                .fill(`NUMFIC = ${registroActual.numfic}`)
                .then(respuesta => {
                    const cafiso = jsdo.ttCAFISO.findById(
                        respuesta.jsdo.getId()
                    )
                    cafiso.assign(dataSet)
                    return jsdo.saveChanges(useSubmit)
                })
                .then(
                    jsdo => jsdo,
                    error => error
                )
        }
    })
}

export const borrarCafiso = registroActual => {
    const useSubmit = true
    const {
        ficgen,
        direcc,
        numfic,
        locali,
        prosol,
        tipfin,
        califi,
        calurb,
        supsol,
        profed,
        arm,
        longfa,
        edacsr,
        edacbr,
        edposr,
        edpobr,
    } = registroActual

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'cafiso' })
        const dataSet = {
            NUMFIC: numfic,
            DIRECC: direcc,
            LOCALI: locali,
            TIPFIN: tipfin,
            CALIFI: califi,
            CALURB: calurb,
            EDACSR: edacsr,
            EDACBR: edacbr,
            EDPOSR: edposr,
            EDPOBR: edpobr,
            PROSOL: prosol,
            SUPSOL: supsol,
            ARM: arm,
            PROFED: profed,
            LONGFA: longfa,
            FICGEN: ficgen,
        }

        jsdo.fill(`NUMFIC = ${registroActual.numfic}`).then(
            respuesta => {
                const cafiso = jsdo.ttCAFISO.findById(respuesta.jsdo.getId())
                cafiso.remove(dataSet)

                return jsdo.saveChanges(useSubmit)
            },
            error => error
        )
    })
}

export const obtenerRegistrosCafiso = filtro => {
    return conectar().then(respuesta => {
        const { result } = respuesta

        if (result === 1 || result === 3) {
            const jsdo = new progress.data.JSDO({ name: 'cafiso' })

            return jsdo.fill(filtro).then(
                jsdo => {
                    return jsdo
                },
                error => {
                    return error
                }
            )
        } else {
            console.log('Usuario o contraseña incorrectos.')
        }
    })

    // return obtenerConexion().then(() => {
    //     const jsdo = new progress.data.JSDO({ name: 'cafiso' })

    //     return jsdo.fill(filtro).then(
    //         jsdo => {
    //             console.log('jsdo', jsdo)
    //             return jsdo
    //         },
    //         error => {
    //             console.log('error', error)
    //             return error
    //         }
    //     )
    // })
}
