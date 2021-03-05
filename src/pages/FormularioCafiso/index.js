import React, { useState, useEffect, useRef, useContext } from 'react'

// Componentes
import {
    Campo,
    CampoError,
    CampoObligatorio,
    Boton,
    BotonBuscar,
    BotonDisabled,
} from '../../componentes/UI'
import { FormularioEstilos, BloqueCampo } from './styledComponents'
import Alerta from '../../componentes/Alerta'
import ModalConfirmacion from '../../componentes/ModalConfirmacion'
import ModalAyudaTipoFinca from '../../componentes/ModalAyudaTipoFinca'
import ModalAyudaCalificacionUrbanistica from '../../componentes/ModalAyudaCalificacionUrbanistica'

// Dependencias
import { Formik } from 'formik'
import * as Yup from 'yup'
import { progress } from '@progress/jsdo-core'
import { useHistory } from 'react-router-dom'
import { obtenerConexion } from '../../services'

// Contexto
import AppContext from '../../context/AppContext'

import './styles.css'

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
        setRegistroActual,
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
    const useSubmit = true
    const [errorTipoFinca, setErrorTipoFinca] = useState(false)
    const [errorCalificacion, setErrorCalificacion] = useState(false)
    const [confirmacion, setConfirmacion] = useState(false)
    const [ayudaTipoFinca, setAyudaTipoFinca] = useState(false)
    const [
        ayudaCalificacionUrbanistica,
        setAyudaCalificacionUrbanistica,
    ] = useState(false)

    // Referencias para acceder al DOM de algunos campos
    const numficRef = useRef()
    const tipfinRef = useRef()
    const califiRef = useRef()
    const formRef = useRef()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const gestionErrores = error => {
        const _mensaje = error.request.response._errors[0]._errorMsg
        const inicio = _mensaje.indexOf(':') + 2
        const fin = _mensaje.indexOf('(') - 1
        setMensaje(_mensaje.substring(inicio, fin))

        if (_mensaje.match(/tipo de finca/)) {
            setErrorTipoFinca(true)
            tipfinRef.current.select()
        }
        if (_mensaje.match(/calificación energética/)) {
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

        obtenerConexion().then(() => {
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

            /* Por defecto anulamos el state de las operaciones para que no salgan
               los mensajes en la pantalla de la lista
            */
            setRegistroCreado(null)
            setRegistroBorrado(null)
            setRegistroModificado(null)

            if (!registroActual) {
                // Nuevo registro
                jsdo.add(dataSet)
                jsdo.saveChanges(useSubmit).then(
                    jsdo => {
                        const { success } = jsdo
                        if (success) {
                            setRegistroCreado(true)
                            history.push('/lista')
                        }
                    },
                    error => {
                        gestionErrores(error)
                    }
                )
            } else {
                jsdo.fill(`NUMFIC = ${registroActual.numfic}`)
                    .then(respuesta => {
                        const cafiso = jsdo.ttCAFISO.findById(
                            respuesta.jsdo.getId()
                        )
                        cafiso.assign(dataSet)

                        return jsdo.saveChanges(useSubmit)
                    })
                    .then(
                        jsdo => {
                            const { success } = jsdo
                            if (success) {
                                setRegistroModificado(true)
                                history.push('/lista')
                            }
                        },
                        error => {
                            gestionErrores(error)
                        }
                    )
            }
        })
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

        obtenerConexion().then(() => {
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

            jsdo.fill(`NUMFIC = ${registroActual.numfic}`)
                .then(
                    respuesta => {
                        const cafiso = jsdo.ttCAFISO.findById(
                            respuesta.jsdo.getId()
                        )
                        cafiso.remove(dataSet)

                        return jsdo.saveChanges(useSubmit)
                    },
                    () => {
                        console.log('Error while reading records.')
                    }
                )
                .then(() => {
                    setRegistroBorrado(true)
                })
        })
    }

    const handleCancelarConfirmacion = () => {
        setConfirmacion(false)
    }

    const handleVolver = () => {
        history.push('/lista')
    }

    const handleNuevo = () => {
        setRegistroActual(null)
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

    const handleDetalle = () => {
        console.log(registroActual)
        history.push('/lista-detalle')
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        // Inicializaciones
        registroActual && setInitialValues(registroActual)
        numficRef.current.select()

        setRegistroCreado(false)
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
                        errors,
                        touched,
                        isValid,
                        dirty,
                        resetForm,
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
                                    <div className='linea1__bloque1'>
                                        <div>
                                            <label htmlFor='numfic'>
                                                Nº de Registro
                                            </label>
                                            <Campo
                                                id='numfic'
                                                type='text'
                                                disabled
                                                value={values.numfic}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'numfic',
                                                        e.target.value
                                                    )
                                                }
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
                                                <Campo
                                                    id='ficgen'
                                                    name='ficgen'
                                                    type='number'
                                                    value={values.ficgen}
                                                    onChange={e =>
                                                        setFieldValue(
                                                            'ficgen',
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={handleBlur}
                                                    ref={numficRef}
                                                />
                                            </div>
                                        </BloqueCampo>
                                    </div>
                                    <div className='linea1__bloque2'>
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
                                    <div className='linea3__bloque1'>
                                        <div>
                                            <label htmlFor='tipfin'>
                                                Tipo Finca
                                                <CampoObligatorio>
                                                    *
                                                </CampoObligatorio>
                                            </label>
                                            <BloqueCampo>
                                                {errorTipoFinca ? (
                                                    <CampoError
                                                        id='tipfin'
                                                        type='number'
                                                        value={values.tipfin}
                                                        onChange={e =>
                                                            setFieldValue(
                                                                'tipfin',
                                                                e.target.value
                                                            )
                                                        }
                                                        onBlur={handleBlur}
                                                        ref={tipfinRef}
                                                    />
                                                ) : (
                                                    <Campo
                                                        id='tipfin'
                                                        type='number'
                                                        value={values.tipfin}
                                                        onChange={e =>
                                                            setFieldValue(
                                                                'tipfin',
                                                                e.target.value
                                                            )
                                                        }
                                                        ref={tipfinRef}
                                                    />
                                                )}
                                                <BotonBuscar
                                                    type='button'
                                                    onClick={() =>
                                                        setAyudaTipoFinca(true)
                                                    }
                                                >
                                                    <i className='fas fa-search fa-lg'></i>
                                                </BotonBuscar>
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
                                    <div className='linea3__bloque2'>
                                        <div>
                                            <label htmlFor='califi'>
                                                Cal. Urb.
                                                <CampoObligatorio>
                                                    *
                                                </CampoObligatorio>
                                            </label>
                                            <BloqueCampo>
                                                {errorCalificacion ? (
                                                    <CampoError
                                                        id='califi'
                                                        type='number'
                                                        value={values.califi}
                                                        onChange={e =>
                                                            setFieldValue(
                                                                'califi',
                                                                e.target.value
                                                            )
                                                        }
                                                        ref={califiRef}
                                                    />
                                                ) : (
                                                    <Campo
                                                        id='califi'
                                                        type='number'
                                                        value={values.califi}
                                                        onChange={e =>
                                                            setFieldValue(
                                                                'califi',
                                                                e.target.value
                                                            )
                                                        }
                                                        ref={califiRef}
                                                    />
                                                )}
                                                <BotonBuscar
                                                    type='button'
                                                    onClick={() =>
                                                        setAyudaCalificacionUrbanistica(
                                                            true
                                                        )
                                                    }
                                                >
                                                    <i className='fas fa-search fa-lg'></i>
                                                </BotonBuscar>
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
                                    <div className='dosbloques'>
                                        <div>
                                            <label htmlFor='supsol'>
                                                Superficie
                                            </label>
                                            <Campo
                                                id='supsol'
                                                type='number'
                                                value={values.supsol}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'supsol',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label>Prof. Edif.</label>
                                            <Campo
                                                id='profed'
                                                type='number'
                                                value={values.profed}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'profed',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='dosbloques'>
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
                                            <Campo
                                                id='longfa'
                                                type='number'
                                                onChange={handleChange}
                                                value={values.longfa}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'longfa',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </article>
                            </section>
                            <section>
                                <h2>Edificabilidad</h2>
                                <article>
                                    <div className='dosbloques'>
                                        <div>
                                            <label htmlFor='edacsr'>
                                                Actual s/Rasante
                                            </label>
                                            <Campo
                                                id='edacsr'
                                                type='number'
                                                value={values.edacsr}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'edacsr',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='edacbr'>
                                                Actual b/Rasante
                                            </label>
                                            <Campo
                                                id='edabsr'
                                                type='number'
                                                value={values.edacbr}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'edacbr',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='dosbloques'>
                                        <div>
                                            <label htmlFor='edposr'>
                                                Potencial s/Rasante
                                            </label>
                                            <Campo
                                                id='edposr'
                                                type='number'
                                                value={values.edaposr}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'edposr',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='edpobr'>
                                                Potencial b/Rasante
                                            </label>
                                            <Campo
                                                id='edpobr'
                                                type='number'
                                                value={values.edapobr}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'edpobr',
                                                        e.target.value
                                                    )
                                                }
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
                                        <Boton
                                            width='120px'
                                            type='button'
                                            onClick={handleVolver}
                                        >
                                            Volver
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

export default FormularioCafiso
