import React, { useState, useEffect, useRef, useContext } from 'react'

// Componentes
import {
    Campo,
    Editor,
    CampoError,
    Boton,
    IconoBuscar,
    IconoBorrar,
    BotonDisabled,
} from '../../componentes/UI'
import { FormularioEstilos, BloqueCampo } from './styledComponents'
import Alerta from '../../componentes/Alerta'
import ModalConfirmacion from '../../componentes/ModalConfirmacion'
import ModalAyudaAgente from '../../componentes/ModalAyudaAgente'

// Dependencias
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import NumberFormat from 'react-number-format'

// Contexto
import AppContext from '../../context/AppContext'

// Servicios
import { borrarDefiso, guardarDefiso } from '../../services/defiso'

// Hooks
import useLeaveAginmo from '../../hooks/leave/useLeaveAginmo'

import styles from './styles.module.css'

const FormularioDefiso = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [initialValues, setInitialValues] = useState({
        numfic: 0,
        numlin: 0,
        fecent: '',
        agente: 0,
        numtel: '',
        precsr: 0,
        precbr: 0,
        repesr: 0,
        repebr: 0,
        arrend: 0,
        rentab: 0,
        reparr: 0,
        oferta: 0,
        repofe: 0,
        observ: '',
        codsit: '',
        pretot: 0,
        aginmoNombre: '',
        recalcularPrecioTotal: false,
        observ: '',
    })
    const validationSchema = Yup.object({
        // numfic: Yup.number().required().min(1),
    })
    const {
        registroActual,
        registroDetalleActual,
        registroDetalleCreado,
        registroDetalleModificado,
        registroDetalleBorrado,
        guardaRegistroDetalleActual,
        setRegistroDetalleCreado,
        setRegistroDetalleModificado,
        setRegistroDetalleBorrado,
    } = useContext(AppContext)
    const [mensaje, setMensaje] = useState(null)
    const history = useHistory()
    const [confirmacion, setConfirmacion] = useState(false)
    const [errorAgente, setErrorAgente] = useState(false)
    const [ayudaAgente, setAyudaAgente] = useState(false)

    // Referencias para acceder al DOM de algunos campos
    const formRef = useRef()
    const agenteRef = useRef()
    const fecentRef = useRef()

    const { setAginmoActual, leaveAginmo } = useLeaveAginmo()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const gestionErrores = mensaje => {
        const inicio = mensaje.indexOf(':') + 2
        const fin = mensaje.indexOf('(') - 1
        setMensaje(mensaje.substring(inicio, fin))

        setErrorAgente(true)
        agenteRef.current.select()
    }

    const handleSubmit = async (e, values) => {
        e.preventDefault()

        if (!values) {
            setMensaje('Error al obtener los datos del registro.')
            return
        }

        if (!registroActual) {
            setMensaje('No se ha encontrado el registro actual de solars')
            return
        }

        guardarDefiso(values, registroDetalleActual, registroActual).then(
            respuesta => {
                /* Por defecto anulamos el state de las operaciones para que no salgan
                   los mensajes en la pantalla de la lista
                */
                setRegistroDetalleCreado(null)
                setRegistroDetalleBorrado(null)
                setRegistroDetalleModificado(null)

                const { success } = respuesta

                if (success) {
                    if (registroDetalleActual) {
                        setRegistroDetalleModificado(true)
                    } else {
                        setRegistroDetalleCreado(true)
                    }

                    history.push('/lista-detalle')
                } else {
                    console.log(error)
                    const error =
                        respuesta.request.response._errors[0]._errorMsg
                    gestionErrores(error)
                }
            }
        )

        // const {
        //     numfic,
        //     numlin,
        //     agente,
        //     aginmoNombre,
        //     arrend,
        //     codsit,
        //     fecent,
        //     numtel,
        //     oferta,
        //     precbr,
        //     precsr,
        //     pretot,
        //     rentab,
        //     reparr,
        //     repebr,
        //     repesr,
        //     repofe,
        //     observ,
        // } = values

        // obtenerConexion().then(() => {
        //     const jsdo = new progress.data.JSDO({ name: 'defiso' })
        //     const dataSet = {
        //         NUMFIC: numfic,
        //         NUMLIN: numlin,
        //         AGENTE: agente,
        //         AGINMO_NOMBRE: aginmoNombre,
        //         ARREND: arrend,
        //         CODSIT: codsit,
        //         FECENT: fecent,
        //         NUMTEL: numtel,
        //         OBSERV: observ,
        //         OFERTA: oferta,
        //         PRECBR: precbr,
        //         PRECSR: precsr,
        //         PRETOT: pretot,
        //         RENTAB: rentab,
        //         REPARR: reparr,
        //         REPEBR: repebr,
        //         REPESR: repesr,
        //         REPOFE: repofe,
        //         OBSERV: observ,
        //     }

        //     /* Por defecto anulamos el state de las operaciones para que no salgan
        //        los mensajes en la pantalla de la lista
        //     */
        //     setRegistroDetalleCreado(null)
        //     setRegistroDetalleBorrado(null)
        //     setRegistroDetalleModificado(null)

        //     if (!registroDetalleActual) {
        //         // Nuevo registro
        //         jsdo.add(dataSet)
        //         jsdo.saveChanges(useSubmit).then(
        //             jsdo => {
        //                 const { success } = jsdo
        //                 if (success) {
        //                     setRegistroDetalleCreado(true)
        //                     history.push('/lista-detalle')
        //                 }
        //             },
        //             error => {
        //                 gestionErrores(error)
        //             }
        //         )
        //     } else {
        //         jsdo.fill(
        //             `NUMFIC = ${registroDetalleActual.numfic} AND NUMLIN = ${registroDetalleActual.numlin}`
        //         )
        //             .then(respuesta => {
        //                 const defiso = jsdo.ttDEFISO.findById(
        //                     respuesta.jsdo.getId()
        //                 )
        //                 defiso.assign(dataSet)

        //                 return jsdo.saveChanges(useSubmit)
        //             })
        //             .then(
        //                 jsdo => {
        //                     const { success } = jsdo
        //                     if (success) {
        //                         setRegistroDetalleModificado(true)
        //                         history.push('/lista-detalle')
        //                     }
        //                 },
        //                 error => {
        //                     gestionErrores(error)
        //                 }
        //             )
        //     }
        // })
    }

    const handleBorrar = () => {
        if (!registroDetalleActual) return

        setConfirmacion(true)
    }

    const handleAceptarConfirmacion = () => {
        setConfirmacion(false)

        /* Por defecto anulamos el state de las operaciones para que no salgan
           los mensajes en la pantalla de la lista
        */
        setRegistroDetalleCreado(null)
        setRegistroDetalleBorrado(null)
        setRegistroDetalleModificado(null)

        borrarDefiso(registroActual, registroDetalleActual).then(() =>
            setRegistroDetalleBorrado(true)
        )

        // const {
        //     numfic,
        //     numlin,
        //     agente,
        //     aginmoNombre,
        //     arrend,
        //     codsit,
        //     fecent,
        //     numtel,
        //     oferta,
        //     precbr,
        //     precsr,
        //     pretot,
        //     rentab,
        //     reparr,
        //     repebr,
        //     repesr,
        //     repofe,
        //     observ,
        // } = registroActual

        // obtenerConexion().then(() => {
        //     const jsdo = new progress.data.JSDO({ name: 'defiso' })
        //     const dataSet = {
        //         NUMFIC: numfic,
        //         NUMLIN: numlin,
        //         AGENTE: agente,
        //         AGINMO_NOMBRE: aginmoNombre,
        //         ARREND: arrend,
        //         CODSIT: codsit,
        //         FECENT: fecent,
        //         NUMTEL: numtel,
        //         OBSERV: observ,
        //         OFERTA: oferta,
        //         PRECBR: precbr,
        //         PRECSR: precsr,
        //         PRETOT: pretot,
        //         RENTAB: rentab,
        //         REPARR: reparr,
        //         REPEBR: repebr,
        //         REPESR: repesr,
        //         REPOFE: repofe,
        //         OBSERV: observ,
        //     }

        //     jsdo.fill(
        //         `NUMFIC = ${registroDetalleActual.numfic} AND NUMLIN = ${registroDetalleActual.numlin}`
        //     )
        //         .then(
        //             respuesta => {
        //                 const defiso = jsdo.ttDEFISO.findById(
        //                     respuesta.jsdo.getId()
        //                 )
        //                 defiso.remove(dataSet)

        //                 return jsdo.saveChanges(useSubmit)
        //             },
        //             () => {
        //                 console.log('Error while reading records.')
        //             }
        //         )
        //         .then(() => {
        //             setRegistroDetalleBorrado(true)
        //         })
        // })
    }

    const handleNuevo = () => {
        guardaRegistroDetalleActual(null)

        if (!registroActual) {
            setMensaje('No se ha encontrado el registro actual de solars')
            return
        }

        setInitialValues({
            numfic: registroActual.numfic,
            numlin: 0,
            fecent: '',
            agente: 0,
            numtel: '',
            precsr: 0,
            precbr: 0,
            repesr: 0,
            repebr: 0,
            arrend: 0,
            rentab: 0,
            reparr: 0,
            oferta: 0,
            repofe: 0,
            observ: '',
            codsit: '',
            pretot: 0,
            aginmoNombre: '',
            recalcularPrecioTotal: false,
            observ: '',
        })
    }

    const handleCancelarConfirmacion = () => {
        setConfirmacion(false)
    }

    const handleCancelarAyudaAgente = () => {
        setAyudaAgente(false)
    }

    const handleAceptarAyudaAgente = registroAgente => {
        setAyudaAgente(false)

        formRef.current.setFieldValue('agente', registroAgente.CODAGE)
        formRef.current.setFieldValue('aginmoNombre', registroAgente.NOMBRE)
    }

    const limpiarAgente = () => {
        formRef.current.setFieldValue('agente', '')
        formRef.current.setFieldValue('aginmoNombre', '')
    }

    /* Leave del campo agente: buscamos la descripción del valor introducido */
    const handleBlurAginmo = (e, setFieldValue) => {
        const nuevoValor = parseInt(e.target.value)

        leaveAginmo(nuevoValor, setFieldValue)
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!registroActual) return

        // Inicializaciones
        if (registroDetalleActual) {
            setInitialValues(registroDetalleActual)
        } else {
            setInitialValues({
                numfic: registroActual.numfic,
                numlin: 0,
                fecent: '',
                agente: 0,
                numtel: '',
                precsr: 0,
                precbr: 0,
                repesr: 0,
                repebr: 0,
                arrend: 0,
                rentab: 0,
                reparr: 0,
                oferta: 0,
                repofe: 0,
                observ: '',
                codsit: '',
                pretot: 0,
                aginmoNombre: '',
                recalcularPrecioTotal: false,
                observ: '',
            })
        }
        fecentRef.current.select()

        registroActual && setAginmoActual(registroActual.agente)
        setRegistroDetalleCreado(false)
    }, [registroActual, registroDetalleActual])

    useEffect(() => {
        if (
            !registroDetalleCreado &&
            !registroDetalleModificado &&
            !registroDetalleBorrado
        )
            return

        history.push('/lista-detalle')
    }, [
        registroDetalleCreado,
        registroDetalleModificado,
        registroDetalleBorrado,
    ])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalConfirmacion
                mostrarModal={confirmacion}
                handleAceptarConfirmacion={handleAceptarConfirmacion}
                handleCancelarConfirmacion={handleCancelarConfirmacion}
            />
            <ModalAyudaAgente
                mostrarModal={ayudaAgente}
                handleAceptarAyudaAgente={handleAceptarAyudaAgente}
                handleCancelarAyudaAgente={handleCancelarAyudaAgente}
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                innerRef={formRef}
            >
                {formik => {
                    const {
                        values,
                        isValid,
                        dirty,
                        handleBlur,
                        handleChange,
                        setFieldValue,
                    } = formik
                    return (
                        <FormularioEstilos
                            onSubmit={e => handleSubmit(e, values)}
                        >
                            <h1>Mantenimiento Detalle de Solares</h1>
                            {mensaje && (
                                <Alerta mensaje={mensaje} tipo='error' />
                            )}
                            <section>
                                <article>
                                    <div className={styles.linea1__bloque1}>
                                        <div>
                                            <label htmlFor='numfic'>
                                                Nº de Carpeta
                                            </label>
                                            <NumberFormat
                                                id='numfic'
                                                name='numfic'
                                                alineacion='right'
                                                thousandSeparator={true}
                                                disabled={true}
                                                value={values.numfic}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'numfic',
                                                        e.target.value
                                                    )
                                                }
                                                customInput={alineacion => (
                                                    <Campo
                                                        alineacion={alineacion}
                                                    />
                                                )}
                                                customInput={Campo}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='numlin'>
                                                Nº de línea
                                            </label>
                                            <NumberFormat
                                                id='numlin'
                                                name='numlin'
                                                alineacion='right'
                                                thousandSeparator={true}
                                                disabled={true}
                                                value={values.numlin}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'numlin',
                                                        e.target.value
                                                    )
                                                }
                                                customInput={alineacion => (
                                                    <Campo
                                                        alineacion={alineacion}
                                                    />
                                                )}
                                                customInput={Campo}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='fecent'>
                                                Fecha Entrega
                                            </label>

                                            <Campo
                                                id='fecent'
                                                type='date'
                                                value={values.fecent}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'fecent',
                                                        e.target.value
                                                    )
                                                }
                                                ref={fecentRef}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.linea1__bloque2}>
                                        <div>
                                            <label htmlFor='agente'>
                                                Agente
                                            </label>
                                            <BloqueCampo>
                                                {errorAgente ? (
                                                    <NumberFormat
                                                        id='agente'
                                                        name='agente'
                                                        alineacion='right'
                                                        value={values.agente}
                                                        thousandSeparator={true}
                                                        allowNegative={false}
                                                        onChange={e =>
                                                            setFieldValue(
                                                                'agente',
                                                                e.target.value
                                                            )
                                                        }
                                                        customInput={alineacion => (
                                                            <CampoError
                                                                alineacion={
                                                                    alineacion
                                                                }
                                                            />
                                                        )}
                                                        customInput={CampoError}
                                                        getInputRef={el =>
                                                            (agenteRef.current = el)
                                                        }
                                                        onBlur={e =>
                                                            handleBlurAginmo(
                                                                e,
                                                                setFieldValue
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <NumberFormat
                                                        id='agente'
                                                        name='agente'
                                                        alineacion='right'
                                                        value={values.agente}
                                                        thousandSeparator={true}
                                                        allowNegative={false}
                                                        onChange={e =>
                                                            setFieldValue(
                                                                'agente',
                                                                e.target.value
                                                            )
                                                        }
                                                        customInput={alineacion => (
                                                            <Campo
                                                                alineacion={
                                                                    alineacion
                                                                }
                                                            />
                                                        )}
                                                        customInput={Campo}
                                                        getInputRef={el =>
                                                            (agenteRef.current = el)
                                                        }
                                                        onBlur={e =>
                                                            handleBlurAginmo(
                                                                e,
                                                                setFieldValue
                                                            )
                                                        }
                                                    />
                                                )}
                                                <IconoBuscar
                                                    type='button'
                                                    title='Seleccionar agente inmobiliario'
                                                    onClick={() =>
                                                        setAyudaAgente(true)
                                                    }
                                                >
                                                    <i className='fas fa-search'></i>
                                                </IconoBuscar>
                                                <IconoBorrar
                                                    type='button'
                                                    title='Borrar selección agente inmobiliario'
                                                    onClick={limpiarAgente}
                                                >
                                                    &times;
                                                </IconoBorrar>
                                            </BloqueCampo>
                                        </div>
                                        <div>
                                            <label>Nombre</label>
                                            <Campo
                                                id='aginmoNombre'
                                                type='text'
                                                disabled
                                                value={values.aginmoNombre}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'aginmoNombre',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </article>
                                <article>
                                    <div className={styles.dosbloques}>
                                        <div>
                                            <label htmlFor='numtel'>
                                                Telefono
                                            </label>
                                            <Campo
                                                id='numtel'
                                                type='text'
                                                value={values.numtel}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'numtel',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='precbr'>
                                                Precio B/R
                                            </label>
                                            <NumberFormat
                                                id='precbr'
                                                name='precbr'
                                                alineacion='right'
                                                value={values.precbr}
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'precbr',
                                                        e.target.value
                                                    )
                                                }
                                                customInput={alineacion => (
                                                    <Campo
                                                        alineacion={alineacion}
                                                    />
                                                )}
                                                customInput={Campo}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.dosbloques}>
                                        <div>
                                            <label htmlFor='precsr'>
                                                Precio C/R
                                            </label>
                                            <NumberFormat
                                                id='precsr'
                                                name='precsr'
                                                alineacion='right'
                                                value={values.precsr}
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'precsr',
                                                        e.target.value
                                                    )
                                                }
                                                customInput={alineacion => (
                                                    <Campo
                                                        alineacion={alineacion}
                                                    />
                                                )}
                                                customInput={Campo}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='pretot'>
                                                Precio Total
                                            </label>
                                            <NumberFormat
                                                id='pretot'
                                                name='pretot'
                                                alineacion='right'
                                                value={values.pretot}
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'pretot',
                                                        e.target.value
                                                    )
                                                }
                                                customInput={alineacion => (
                                                    <Campo
                                                        alineacion={alineacion}
                                                    />
                                                )}
                                                customInput={Campo}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.dosbloques}>
                                        <div>
                                            <label htmlFor='repebr'>
                                                Repercusión B/R
                                            </label>
                                            <NumberFormat
                                                id='repebr'
                                                name='repebr'
                                                alineacion='right'
                                                value={values.repebr}
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'repebr',
                                                        e.target.value
                                                    )
                                                }
                                                customInput={alineacion => (
                                                    <Campo
                                                        alineacion={alineacion}
                                                    />
                                                )}
                                                customInput={Campo}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='repesr'>
                                                Repercusión S/R
                                            </label>
                                            <NumberFormat
                                                id='repesr'
                                                name='repesr'
                                                alineacion='right'
                                                value={values.repesr}
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'repesr',
                                                        e.target.value
                                                    )
                                                }
                                                customInput={alineacion => (
                                                    <Campo
                                                        alineacion={alineacion}
                                                    />
                                                )}
                                                customInput={Campo}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor='arrend'>
                                            Arrendatarios
                                        </label>
                                        <Campo
                                            id='arrend'
                                            type='text'
                                            value={values.arrend}
                                            onChange={e =>
                                                setFieldValue(
                                                    'arrend',
                                                    e.target.value
                                                )
                                            }
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </article>
                                <article>
                                    <div className={styles.dosbloques}>
                                        <div>
                                            <label htmlFor='rentab'>
                                                Rentabilidad
                                            </label>
                                            <NumberFormat
                                                id='rentab'
                                                name='rentab'
                                                alineacion='right'
                                                value={values.rentab}
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'rentab',
                                                        e.target.value
                                                    )
                                                }
                                                customInput={alineacion => (
                                                    <Campo
                                                        alineacion={alineacion}
                                                    />
                                                )}
                                                customInput={Campo}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='reparr'>
                                                Repercusión Arrendatarios
                                            </label>
                                            <NumberFormat
                                                id='reparr'
                                                name='reparr'
                                                alineacion='right'
                                                value={values.reparr}
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'reparr',
                                                        e.target.value
                                                    )
                                                }
                                                customInput={alineacion => (
                                                    <Campo
                                                        alineacion={alineacion}
                                                    />
                                                )}
                                                customInput={Campo}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.dosbloques}>
                                        <div>
                                            <label htmlFor='oferta'>
                                                Oferta
                                            </label>
                                            <NumberFormat
                                                id='oferta'
                                                name='oferta'
                                                alineacion='right'
                                                value={values.oferta}
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'oferta',
                                                        e.target.value
                                                    )
                                                }
                                                customInput={alineacion => (
                                                    <Campo
                                                        alineacion={alineacion}
                                                    />
                                                )}
                                                customInput={Campo}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='repofe'>
                                                Repercusión Oferta
                                            </label>
                                            <NumberFormat
                                                id='repofe'
                                                name='repofe'
                                                alineacion='right'
                                                value={values.repofe}
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'repofe',
                                                        e.target.value
                                                    )
                                                }
                                                customInput={alineacion => (
                                                    <Campo
                                                        alineacion={alineacion}
                                                    />
                                                )}
                                                customInput={Campo}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>
                                </article>
                                <article>
                                    <div className='linea5'>
                                        <label htmlFor='repofe'>
                                            Comentarios
                                        </label>
                                        <Editor
                                            rows='5'
                                            id='arrend'
                                            value={values.observ}
                                            onChange={e =>
                                                setFieldValue(
                                                    'observ',
                                                    e.target.value
                                                )
                                            }
                                            onBlur={handleBlur}
                                        ></Editor>
                                    </div>
                                </article>
                                <footer>
                                    {registroDetalleActual ? (
                                        <Boton
                                            width='120px'
                                            type='button'
                                            onClick={handleBorrar}
                                        >
                                            Borrar
                                        </Boton>
                                    ) : (
                                        <BotonDisabled
                                            width='120px'
                                            type='button'
                                        >
                                            Borrar
                                        </BotonDisabled>
                                    )}
                                    <div>
                                        <Boton
                                            width='120px'
                                            type='reset'
                                            onClick={handleNuevo}
                                        >
                                            Nuevo
                                        </Boton>
                                        <Boton width='120px' type='submit'>
                                            Guardar
                                        </Boton>
                                    </div>
                                </footer>
                            </section>
                        </FormularioEstilos>
                    )
                }}
            </Formik>
        </>
    )
}

export default FormularioDefiso
