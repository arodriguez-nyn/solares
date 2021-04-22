import { progress } from '@progress/jsdo-core'
import { conectar } from './comun'

export const guardarDefiso = (values, registroActual, registroCafiso) => {
    const useSubmit = true
    const {
        numfic,
        numlin,
        agente,
        aginmoNombre,
        arrend,
        codsit,
        fecent,
        numtel,
        oferta,
        precbr,
        precsr,
        pretot,
        rentab,
        reparr,
        repebr,
        repesr,
        repofe,
        observ,
    } = values

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'defiso' })
        const dataSet = {
            NUMFIC: numfic,
            NUMLIN: numlin,
            AGENTE: agente,
            AGINMO_NOMBRE: aginmoNombre,
            ARREND: arrend,
            CODSIT: codsit,
            FECENT: fecent,
            NUMTEL: numtel,
            OBSERV: observ,
            OFERTA: oferta,
            PRECBR: precbr,
            PRECSR: precsr,
            PRETOT: pretot,
            RENTAB: rentab,
            REPARR: reparr,
            REPEBR: repebr,
            REPESR: repesr,
            REPOFE: repofe,
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
            return jsdo
                .fill(
                    `NUMFIC = ${registroCafiso.numfic} AND NUMLIN = ${registroActual.numlin}`
                )
                .then(respuesta => {
                    const defiso = jsdo.ttDEFISO.findById(
                        respuesta.jsdo.getId()
                    )
                    defiso.assign(dataSet)
                    return jsdo.saveChanges(useSubmit)
                })
                .then(
                    jsdo => jsdo,
                    error => error
                )
        }
    })
}

export const borrarDefiso = (registroCafiso, registroActual) => {
    const useSubmit = true
    const {
        numfic,
        numlin,
        agente,
        aginmoNombre,
        arrend,
        codsit,
        fecent,
        numtel,
        oferta,
        precbr,
        precsr,
        pretot,
        rentab,
        reparr,
        repebr,
        repesr,
        repofe,
        observ,
    } = registroActual

    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'defiso' })
        const dataSet = {
            NUMFIC: numfic,
            NUMLIN: numlin,
            AGENTE: agente,
            AGINMO_NOMBRE: aginmoNombre,
            ARREND: arrend,
            CODSIT: codsit,
            FECENT: fecent,
            NUMTEL: numtel,
            OBSERV: observ,
            OFERTA: oferta,
            PRECBR: precbr,
            PRECSR: precsr,
            PRETOT: pretot,
            RENTAB: rentab,
            REPARR: reparr,
            REPEBR: repebr,
            REPESR: repesr,
            REPOFE: repofe,
            OBSERV: observ,
        }

        jsdo.fill(
            `NUMFIC = ${registroCafiso.numfic} AND NUMLIN = ${registroActual.numlin}`
        ).then(
            respuesta => {
                const defiso = jsdo.ttDEFISO.findById(respuesta.jsdo.getId())
                defiso.remove(dataSet)

                return jsdo.saveChanges(useSubmit)
            },
            error => error
        )
    })
}

export const obtenerRegistrosDefiso = filtro => {
    return conectar().then(() => {
        const jsdo = new progress.data.JSDO({ name: 'defiso' })

        return jsdo.fill(filtro).then(
            jsdo => jsdo,
            error => error
        )
    })
}
