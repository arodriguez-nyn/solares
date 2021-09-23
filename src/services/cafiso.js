import { progress } from '@progress/jsdo-core'
import { conectar } from './comun'
import axios from 'axios'

const urlFicheros = 'http://192.168.1.32:4000/api/archivos'

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
    return conectar().then(
        respuesta => {
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
                return result
            }
        },
        error => {
            console.log('error cafiso', error)
        }
    )
}

export const obtenerArchivosDocumentacion = numfic => {
    return conectar().then(
        respuesta => {
            const { result } = respuesta

            if (result === 1 || result === 3) {
                const jsdo = new progress.data.JSDO({ name: 'cafiso' })

                const ablFilter = { numfic }
                return jsdo.invoke('ObtieneListaFicheros', ablFilter).then(
                    jsdo => {
                        if (jsdo.success) {
                            return jsdo
                        }
                    },
                    error => {
                        console.log('error al obtener archivos', error)
                        return error
                    }
                )
            } else {
                return result
            }
        },
        error => {
            console.log('error archivos', error)
        }
    )
}

export const muestraCarpeta = (numfic, ruta) => {
    return conectar().then(
        respuesta => {
            const { result } = respuesta

            if (result === 1 || result === 3) {
                const jsdo = new progress.data.JSDO({ name: 'cafiso' })
                const ablFilter = { numfic, ruta }
                return jsdo.invoke('ObtieneFicherosSubcarpeta', ablFilter).then(
                    jsdo => {
                        console.log('jsdo', jsdo)
                        if (jsdo.success) {
                            return jsdo
                        }
                    },
                    error => {
                        console.log('error al obtener archivos', error)
                        return error
                    }
                )
            } else {
                return result
            }
        },
        error => {
            console.log('error archivos', error)
        }
    )
}

export const obtieneArchivo = ruta => {
    return conectar().then(
        respuesta => {
            const { result } = respuesta

            if (result === 1 || result === 3) {
                const jsdo = new progress.data.JSDO({ name: 'cafiso' })

                const ablFilter = { ruta }
                return jsdo.invoke('ObtieneFichero', ablFilter).then(
                    jsdo => {
                        if (jsdo.success) {
                            return jsdo
                        }
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
            console.log('error archivos', error)
        }
    )
}

// export const cargaDirectorios = numfic => {
//     return conectar().then(
//         respuesta => {
//             const { result } = respuesta

//             if (result === 1 || result === 3) {
//                 const jsdo = new progress.data.JSDO({ name: 'cafiso' })

//                 const ablFilter = { numfic }
//                 return jsdo.invoke('CargaDirectorios', ablFilter).then(
//                     jsdo => {
//                         if (jsdo.success) {
//                             console.log(jsdo)
//                         }
//                     },
//                     error => {
//                         return error
//                     }
//                 )
//             } else {
//                 return result
//             }
//         },
//         error => {
//             console.log('error archivos', error)
//         }
//     )
// }

// export const cargaDocumentosOld = (numfic, fichero) => {
//     return conectar().then(
//         respuesta => {
//             const { result } = respuesta

//             if (result === 1 || result === 3) {
//                 const jsdo = new progress.data.JSDO({ name: 'cafiso' })

//                 const ablFilter = { numfic, fichero }
//                 return jsdo.invoke('CargaDocumentos', ablFilter).then(
//                     respuesta => {
//                         console.log('respuesta', respuesta)
//                     },
//                     error => {
//                         console.log('error', error)
//                         return error
//                     }
//                 )
//             } else {
//                 return result
//             }
//         },
//         error => {
//             console.log('error archivos', error)
//         }
//     )
// }

export const upload = (formData, carpeta) => {
    return conectar().then(
        respuesta => {
            const { result } = respuesta
            if (result === 1 || result === 3) {
                // Submimos con axios el fichero en el servidor node
                const url = `${urlFicheros}?carpeta=${carpeta}`

                return axios
                    .post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(() => {
                        console.log('Archivos guardados')
                        return { tipo: 'exito', msg: 'Archivo guardado' }
                    })
                    .catch(error => {
                        console.log('error axios', error)
                        return {
                            tipo: 'error',
                            msg: 'Error al guardar el archivo',
                        }
                    })
            } else {
                return result
            }
        },
        error => {
            console.log('error archivos', error)
        }
    )
}
