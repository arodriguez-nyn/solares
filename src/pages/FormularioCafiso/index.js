import React, { useState, useEffect, useRef, useContext } from 'react'

// Componentes
import {
    Campo,
    CampoError,
    CampoObligatorio,
    Boton,
    IconoBuscar,
    IconoBorrar,
    BotonDisabled,
} from '../../componentes/UI'
import { FormularioEstilos, BloqueCampo } from './styledComponents'
import Alerta from '../../componentes/Alerta'
import ModalConfirmacion from '../../componentes/modales/ModalConfirmacion'
import ModalAyudaTipoFinca from '../../componentes/modales/ModalAyudaTipoFinca'
import ModalAyudaCalificacionUrbanistica from '../../componentes/modales/ModalAyudaCalificacionUrbanistica'

// Dependencias
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import NumberFormat from 'react-number-format'

// Servicios
import { borrarCafiso, guardarCafiso } from '../../services/cafiso'

// Contexto
import AppContext from '../../context/AppContext'

// Hooks
import useLeaveTipfin from '../../hooks/leave/useLeaveTipfin'
import useLeaveCalurb from '../../hooks/leave/useLeaveCalurb'

import styles from './styles.module.css'

const FormularioCafiso = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [initialValues, setInitialValues] = useState({
        numfic: 0,
        ficgen: 0,
        direcc: '',
        locali: '',
        prosol: '',
        tipfin: 0,
        tipfinDescri: '',
        califi: 0,
        calurb: '',
        calurbDescri: '',
        supsol: 0,
        profed: 0,
        arm: '',
        longfa: 0,
        edacsr: 0,
        edacbr: 0,
        edposr: 0,
        edpobr: 0,
    })
    const history = useHistory()
    const {
        registroActual,
        registroCreado,
        registroModificado,
        registroBorrado,
        guardaRegistroActual,
        setRegistroCreado,
        setRegistroModificado,
        setRegistroBorrado,
    } = useContext(AppContext)
    const [mensaje, setMensaje] = useState(null)

    const validationSchema = Yup.object({
        ficgen: Yup.number().required().min(1),
        tipfin: Yup.number().required().min(1),
        califi: Yup.number().required().min(1),
    })
    const [errorTipoFinca, setErrorTipoFinca] = useState(false)
    const [errorCalificacion, setErrorCalificacion] = useState(false)
    const [confirmacion, setConfirmacion] = useState(false)
    const [ayudaTipoFinca, setAyudaTipoFinca] = useState(false)
    const [
        ayudaCalificacionUrbanistica,
        setAyudaCalificacionUrbanistica,
    ] = useState(false)

    // Referencias para acceder al DOM de algunos campos
    const ficgenRef = useRef()
    const tipfinRef = useRef()
    const califiRef = useRef()
    const formRef = useRef()

    const { setTipfinActual, leaveTipfin } = useLeaveTipfin()
    const { setCalurbActual, leaveCalurb } = useLeaveCalurb()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const gestionErrores = mensaje => {
        const inicio = mensaje.indexOf(':') + 2
        const fin = mensaje.indexOf('(') - 1
        setMensaje(mensaje.substring(inicio, fin))

        if (mensaje.match(/tipo de finca/)) {
            setErrorTipoFinca(true)
            tipfinRef.current.select()
        }
        if (mensaje.match(/calificación energética/)) {
            setErrorCalificacion(true)
            califiRef.current.select()
        }
    }

    const handleSubmit = async (e, values) => {
        e.preventDefault()

        if (!values) {
            setMensaje('Error al obtener los datos del registro.')
            return
        }

        guardarCafiso(values, registroActual).then(respuesta => {
            /* Por defecto anulamos el state de las operaciones para que no salgan
               los mensajes en la pantalla de la lista
            */
            setRegistroCreado(null)
            setRegistroBorrado(null)
            setRegistroModificado(null)

            const { success } = respuesta

            if (success) {
                if (registroActual) {
                    setRegistroModificado(true)
                } else {
                    setRegistroCreado(true)
                }

                history.push('/lista')
            } else {
                const error = respuesta.request.response._errors[0]._errorMsg
                gestionErrores(error)
            }
        })

        // obtenerConexion().then(() => {
        //     const jsdo = new progress.data.JSDO({ name: 'cafiso' })
        //     const dataSet = {
        //         NUMFIC: numfic,
        //         DIRECC: direcc,
        //         LOCALI: locali,
        //         TIPFIN: tipfin,
        //         CALIFI: califi,
        //         CALURB: calurb,
        //         EDACSR: edacsr,
        //         EDACBR: edacbr,
        //         EDPOSR: edposr,
        //         EDPOBR: edpobr,
        //         PROSOL: prosol,
        //         SUPSOL: supsol,
        //         ARM: arm,
        //         PROFED: profed,
        //         LONGFA: longfa,
        //         FICGEN: ficgen,
        //     }

        //     /* Por defecto anulamos el state de las operaciones para que no salgan
        //        los mensajes en la pantalla de la lista
        //     */
        //     setRegistroCreado(null)
        //     setRegistroBorrado(null)
        //     setRegistroModificado(null)

        //     if (!registroActual) {
        //         // Nuevo registro
        //         jsdo.add(dataSet)
        //         jsdo.saveChanges(useSubmit).then(
        //             jsdo => {
        //                 const { success } = jsdo
        //                 if (success) {
        //                     setRegistroCreado(true)
        //                     history.push('/lista')
        //                 }
        //             },
        //             error => {
        //                 gestionErrores(error)
        //             }
        //         )
        //     } else {
        //         jsdo.fill(`NUMFIC = ${registroActual.numfic}`)
        //             .then(respuesta => {
        //                 const cafiso = jsdo.ttCAFISO.findById(
        //                     respuesta.jsdo.getId()
        //                 )
        //                 cafiso.assign(dataSet)

        //                 return jsdo.saveChanges(useSubmit)
        //             })
        //             .then(
        //                 jsdo => {
        //                     const { success } = jsdo
        //                     if (success) {
        //                         setRegistroModificado(true)
        //                         history.push('/lista')
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
        if (!registroActual) return

        setConfirmacion(true)
    }

    const handleAceptarConfirmacion = () => {
        setConfirmacion(false)

        /* Por defecto anulamos el state de las operaciones para que no salgan
           los mensajes en la pantalla de la lista
        */
        setRegistroCreado(null)
        setRegistroBorrado(null)
        setRegistroModificado(null)

        borrarCafiso(registroActual).then(() => setRegistroBorrado(true))

        // const {
        //     ficgen,
        //     direcc,
        //     numfic,
        //     locali,
        //     prosol,
        //     tipfin,
        //     califi,
        //     calurb,
        //     supsol,
        //     profed,
        //     arm,
        //     longfa,
        //     edacsr,
        //     edacbr,
        //     edposr,
        //     edpobr,
        // } = registroActual

        // obtenerConexion().then(() => {
        //     const jsdo = new progress.data.JSDO({ name: 'cafiso' })
        //     const dataSet = {
        //         NUMFIC: numfic,
        //         DIRECC: direcc,
        //         LOCALI: locali,
        //         TIPFIN: tipfin,
        //         CALIFI: califi,
        //         CALURB: calurb,
        //         EDACSR: edacsr,
        //         EDACBR: edacbr,
        //         EDPOSR: edposr,
        //         EDPOBR: edpobr,
        //         PROSOL: prosol,
        //         SUPSOL: supsol,
        //         ARM: arm,
        //         PROFED: profed,
        //         LONGFA: longfa,
        //         FICGEN: ficgen,
        //     }

        //     jsdo.fill(`NUMFIC = ${registroActual.numfic}`)
        //         .then(
        //             respuesta => {
        //                 const cafiso = jsdo.ttCAFISO.findById(
        //                     respuesta.jsdo.getId()
        //                 )
        //                 cafiso.remove(dataSet)

        //                 return jsdo.saveChanges(useSubmit)
        //             },
        //             () => {
        //                 console.log('Error while reading records.')
        //             }
        //         )
        //         .then(() => {
        //             setRegistroBorrado(true)
        //         })
        // })
    }

    const handleCancelarConfirmacion = () => {
        setConfirmacion(false)
    }

    const handleNuevo = () => {
        guardaRegistroActual(null)
        setInitialValues({
            numfic: 0,
            ficgen: 0,
            direcc: '',
            locali: '',
            prosol: '',
            tipfin: 0,
            tipfinDescri: '',
            califi: 0,
            calurb: '',
            calurbDescri: '',
            supsol: 0,
            profed: 0,
            arm: '',
            longfa: 0,
            edacsr: 0,
            edacbr: 0,
            edposr: 0,
            edpobr: 0,
        })
    }

    const handleCancelarAyudaTipoFinca = () => {
        setAyudaTipoFinca(false)
    }

    const handleAceptarAyudaTipoFinca = registroTipoFinca => {
        setAyudaTipoFinca(false)
        formRef.current.setFieldValue('tipfin', registroTipoFinca.CODTIP)
        formRef.current.setFieldValue('tipfinDescri', registroTipoFinca.DESCRI)
    }

    const handleCancelarAyudaCalificacionUrbanistica = () => {
        setAyudaCalificacionUrbanistica(false)
    }

    const handleAceptarAyudaCalificacionUrbanistica = registroCalificacionUrbanistica => {
        setAyudaCalificacionUrbanistica(false)
        formRef.current.setFieldValue(
            'califi',
            registroCalificacionUrbanistica.CODCAL
        )
        formRef.current.setFieldValue(
            'calurb',
            registroCalificacionUrbanistica.CODIGO
        )
        formRef.current.setFieldValue(
            'calurbDescri',
            registroCalificacionUrbanistica.DESCRI
        )
    }

    const limpiarTipfin = () => {
        formRef.current.setFieldValue('tipfin', '')
        formRef.current.setFieldValue('tipfinDescri', '')
    }

    const limpiarCalifi = () => {
        formRef.current.setFieldValue('califi', '')
        formRef.current.setFieldValue('calurb', '')
        formRef.current.setFieldValue('calurbDescri', '')
    }

    // const handleKeyDownTipfin = (e, setFieldValue, value) => {
    //     e.preventDefault()

    //     console.log(value)

    //     if (e.key === 'F5') setAyudaTipoFinca(true)
    //     else {
    //         setFieldValue('tipfin', value + e.key)
    //     }
    // }

    // const handleKeyDownCalifi = e => {
    //     e.preventDefault()

    //     if (e.key === 'F5') setAyudaCalificacionUrbanistica(true)
    // }

    const handleDetalle = () => {
        history.push('/lista-detalle')
    }

    /* Leave del campo tipfin: buscamos la descripción del valor introducido */
    const handleBlurTipfin = e => {
        const nuevoValor = parseInt(e.target.value)

        leaveTipfin(nuevoValor, setFieldValue)
    }

    /* Leave del campo califi: buscamos la descripción del valor introducido */
    const handleBlurCalurb = e => {
        const nuevoValor = parseInt(e.target.value)

        leaveCalurb(nuevoValor, setFieldValue)
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        // Inicializaciones
        registroActual && setInitialValues(registroActual)
        ficgenRef.current.select()

        setRegistroCreado(false)

        if (registroActual) {
            setTipfinActual(registroActual.tipfin)
            setCalurbActual(registroActual.califi)
        }
    }, [registroActual])

    useEffect(() => {
        if (!registroCreado && !registroModificado && !registroBorrado) return

        history.push('/lista')
    }, [registroCreado, registroModificado, registroBorrado])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalAyudaTipoFinca
                mostrarModal={ayudaTipoFinca}
                handleAceptarAyudaTipoFinca={handleAceptarAyudaTipoFinca}
                handleCancelarAyudaTipoFinca={handleCancelarAyudaTipoFinca}
            />
            <ModalAyudaCalificacionUrbanistica
                mostrarModal={ayudaCalificacionUrbanistica}
                handleAceptarAyudaCalificacionUrbanistica={
                    handleAceptarAyudaCalificacionUrbanistica
                }
                handleCancelarAyudaCalificacionUrbanistica={
                    handleCancelarAyudaCalificacionUrbanistica
                }
            />
            <ModalConfirmacion
                mostrarModal={confirmacion}
                handleAceptarConfirmacion={handleAceptarConfirmacion}
                handleCancelarConfirmacion={handleCancelarConfirmacion}
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
                            <h1>Mantenimiento de Solares</h1>
                            {mensaje && (
                                <Alerta mensaje={mensaje} tipo='error' />
                            )}
                            <section>
                                <h2>Datos Generales</h2>
                                <article>
                                    <div className={styles.dosbloques}>
                                        <div>
                                            <label htmlFor='numfic'>
                                                Nº de Registro
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
                                        <BloqueCampo>
                                            <div>
                                                <label htmlFor='ficgen'>
                                                    Nº de Carpeta
                                                    <CampoObligatorio>
                                                        *
                                                    </CampoObligatorio>
                                                </label>
                                                <NumberFormat
                                                    id='ficgen'
                                                    name='ficgen'
                                                    alineacion='right'
                                                    value={values.ficgen}
                                                    thousandSeparator={true}
                                                    allowNegative={false}
                                                    onChange={e => {
                                                        setFieldValue(
                                                            'ficgen',
                                                            e.target.value
                                                        )
                                                    }}
                                                    customInput={alineacion => (
                                                        <Campo
                                                            alineacion={
                                                                alineacion
                                                            }
                                                        />
                                                    )}
                                                    customInput={Campo}
                                                    getInputRef={el =>
                                                        (ficgenRef.current = el)
                                                    }
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </BloqueCampo>
                                    </div>
                                    <div className={styles.linea1__bloque2}>
                                        <label htmlFor='direcc'>
                                            Dirección
                                        </label>
                                        <Campo
                                            id='direcc'
                                            name='direcc'
                                            type='text'
                                            value={values.direcc}
                                            onChange={e =>
                                                setFieldValue(
                                                    'direcc',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </article>
                                <article>
                                    <div>
                                        <label htmlFor='locali'>
                                            Población
                                        </label>
                                        <Campo
                                            id='locali'
                                            type='text'
                                            value={values.locali}
                                            onChange={e =>
                                                setFieldValue(
                                                    'locali',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='prosol'>
                                            Propietario
                                        </label>
                                        <Campo
                                            id='prosol'
                                            type='text'
                                            value={values.prosol}
                                            onChange={e =>
                                                setFieldValue(
                                                    'prosol',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </article>
                                <article>
                                    <div className={styles.linea3__bloque1}>
                                        <div>
                                            <label htmlFor='tipfin'>
                                                Tipo Finca
                                                <CampoObligatorio>
                                                    *
                                                </CampoObligatorio>
                                            </label>
                                            <BloqueCampo>
                                                {errorTipoFinca ? (
                                                    <NumberFormat
                                                        id='tipfin'
                                                        name='tipfin'
                                                        alineacion='right'
                                                        value={values.tipfin}
                                                        thousandSeparator={true}
                                                        allowNegative={false}
                                                        onChange={e =>
                                                            setFieldValue(
                                                                'tipfin',
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
                                                            (tipfinRef.current = el)
                                                        }
                                                        onBlur={e =>
                                                            handleBlurTipfin(e)
                                                        }
                                                    />
                                                ) : (
                                                    <NumberFormat
                                                        id='tipfin'
                                                        name='tipfin'
                                                        alineacion='right'
                                                        value={values.tipfin}
                                                        allowNegative={false}
                                                        thousandSeparator={true}
                                                        onChange={e => {
                                                            setFieldValue(
                                                                'tipfin',
                                                                e.target.value
                                                            )
                                                        }}
                                                        customInput={alineacion => (
                                                            <Campo
                                                                alineacion={
                                                                    alineacion
                                                                }
                                                            />
                                                        )}
                                                        customInput={Campo}
                                                        getInputRef={el =>
                                                            (tipfinRef.current = el)
                                                        }
                                                        onBlur={e =>
                                                            handleBlurTipfin(
                                                                e,
                                                                setFieldValue
                                                            )
                                                        }
                                                    />
                                                )}
                                                <IconoBuscar
                                                    type='button'
                                                    title='Seleccionar tipo de finca'
                                                    onClick={() =>
                                                        setAyudaTipoFinca(true)
                                                    }
                                                >
                                                    <i className='fas fa-search'></i>
                                                </IconoBuscar>
                                                <IconoBorrar
                                                    type='button'
                                                    title='Borrar selección tipo de finca'
                                                    onClick={limpiarTipfin}
                                                >
                                                    &times;
                                                </IconoBorrar>
                                            </BloqueCampo>
                                        </div>
                                        <div>
                                            <label>Descripción</label>
                                            <Campo
                                                id='tipfin-descri'
                                                type='text'
                                                disabled
                                                value={values.tipfinDescri}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'tipfin-descri',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.linea3__bloque2}>
                                        <div>
                                            <label htmlFor='califi'>
                                                Cal. Urb.
                                                <CampoObligatorio>
                                                    *
                                                </CampoObligatorio>
                                            </label>
                                            <BloqueCampo>
                                                {errorCalificacion ? (
                                                    <NumberFormat
                                                        id='califi'
                                                        name='califi'
                                                        alineacion='right'
                                                        value={values.califi}
                                                        allowNegative={false}
                                                        thousandSeparator={true}
                                                        onChange={e =>
                                                            setFieldValue(
                                                                'califi',
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
                                                            (califiRef.current = el)
                                                        }
                                                        onBlur={e =>
                                                            handleBlurCalurb(
                                                                e,
                                                                setFieldValue
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <NumberFormat
                                                        id='califi'
                                                        name='califi'
                                                        alineacion='right'
                                                        value={values.califi}
                                                        allowNegative={false}
                                                        thousandSeparator={true}
                                                        onChange={e =>
                                                            setFieldValue(
                                                                'califi',
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
                                                            (califiRef.current = el)
                                                        }
                                                        onBlur={e =>
                                                            handleBlurCalurb(
                                                                e,
                                                                setFieldValue
                                                            )
                                                        }
                                                    />
                                                )}
                                                <IconoBuscar
                                                    type='button'
                                                    title='Seleccionar calificación urbanística'
                                                    onClick={() =>
                                                        setAyudaCalificacionUrbanistica(
                                                            true
                                                        )
                                                    }
                                                >
                                                    <i className='fas fa-search'></i>
                                                </IconoBuscar>
                                                <IconoBorrar
                                                    type='button'
                                                    title='Borrar selección calificación urbanística'
                                                    onClick={limpiarCalifi}
                                                >
                                                    &times;
                                                </IconoBorrar>
                                            </BloqueCampo>
                                        </div>
                                        <div>
                                            <label htmlFor='calurb'>
                                                Código
                                            </label>
                                            <Campo
                                                id='calurb'
                                                type='text'
                                                value={values.calurb}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'calurb',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='calurb-descri'>
                                                Descripción
                                            </label>
                                            <Campo
                                                id='calurb-descri'
                                                type='text'
                                                disabled
                                                value={values.calurbDescri}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'calurb-descri',
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
                                            <label htmlFor='supsol'>
                                                Superficie
                                            </label>
                                            <NumberFormat
                                                id='supsol'
                                                name='supsol'
                                                alineacion='right'
                                                value={values.supsol}
                                                allowNegative={false}
                                                thousandSeparator={true}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'supsol',
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
                                            <label>Prof. Edif.</label>
                                            <NumberFormat
                                                id='profed'
                                                name='profed'
                                                alineacion='right'
                                                value={values.profed}
                                                allowNegative={false}
                                                thousandSeparator={true}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'profed',
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
                                    </div>
                                    <div className={styles.dosbloques}>
                                        <div>
                                            <label htmlFor='arm'>ARM</label>
                                            <Campo
                                                id='arm'
                                                type='text'
                                                value={values.arm}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'arm',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label>Longitud</label>
                                            <NumberFormat
                                                id='profed'
                                                name='profed'
                                                alineacion='right'
                                                value={values.profed}
                                                allowNegative={false}
                                                thousandSeparator={true}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'profed',
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
                                    </div>
                                </article>
                            </section>
                            <section>
                                <h2>Edificabilidad</h2>
                                <article>
                                    <div className={styles.dosbloques}>
                                        <div>
                                            <label htmlFor='edacsr'>
                                                Actual s/Rasante
                                            </label>
                                            <NumberFormat
                                                id='edacsr'
                                                name='edacsr'
                                                alineacion='right'
                                                value={values.edacsr}
                                                allowNegative={false}
                                                thousandSeparator={true}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'edacsr',
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
                                            <label htmlFor='edacbr'>
                                                Actual b/Rasante
                                            </label>
                                            <NumberFormat
                                                id='edabsr'
                                                name='edabsr'
                                                alineacion='right'
                                                value={values.edabsr}
                                                allowNegative={false}
                                                thousandSeparator={true}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'edabsr',
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
                                    </div>
                                    <div className={styles.dosbloques}>
                                        <div>
                                            <label htmlFor='edposr'>
                                                Potencial s/Rasante
                                            </label>
                                            <NumberFormat
                                                id='edposr'
                                                name='edposr'
                                                alineacion='right'
                                                value={values.edposr}
                                                allowNegative={false}
                                                thousandSeparator={true}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'edposr',
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
                                            <label htmlFor='edpobr'>
                                                Potencial b/Rasante
                                            </label>
                                            <NumberFormat
                                                id='edpobr'
                                                name='edpobr'
                                                alineacion='right'
                                                value={values.edpobr}
                                                allowNegative={false}
                                                thousandSeparator={true}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'edpobr',
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
                                    </div>
                                </article>
                                <footer>
                                    {registroActual ? (
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
                                    {registroActual ? (
                                        <Boton
                                            width='120px'
                                            type='button'
                                            onClick={handleDetalle}
                                        >
                                            Detalle
                                        </Boton>
                                    ) : (
                                        <BotonDisabled
                                            width='120px'
                                            type='button'
                                        >
                                            Detalle
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
                                        {registroActual ||
                                        (dirty && isValid) ? (
                                            <Boton width='120px' type='submit'>
                                                Guardar
                                            </Boton>
                                        ) : (
                                            <BotonDisabled
                                                width='120px'
                                                type='submit'
                                                disabled
                                            >
                                                Guardar
                                            </BotonDisabled>
                                        )}
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

export default FormularioCafiso
