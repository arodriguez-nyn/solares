import React, { useState, useEffect, useRef, useContext } from 'react'

// Componentes
import Alerta from '../../../componentes/Alerta'
import ModalAyudaDestinoRecordatorio from '../../../componentes/modales/ModalAyudaDestinoRecordatorio'
import ModalConfirmacion from '../../../componentes/modales/ModalConfirmacion'

// Dependencias
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import NumberFormat from 'react-number-format'

// Hooks
import useLeaveDestin from '../../../hooks/leave/useLeaveDestin'

// Servicios
import { borrarPotiag, guardaPotiag } from '../../../services/potiag'

// Contexto
import SACContext from '../../../context/SACContext'

// Estilos CSS
import './styles.css'

const FormularioPotiag = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [initialValues, setInitialValues] = useState({
        numreg: 0,
        numtic: 0,
        numotr: 0,
        destin: 0,
        destinDescri: '',
        priori: '',
        fecrec: '',
        observ: '',
    })
    const history = useHistory()
    const {
        ticket,
        ot,
        registroActual,
        registroCreado,
        registroModificado,
        registroBorrado,
        guardaRegistroActual,
        setRegistroCreado,
        setRegistroModificado,
        setRegistroBorrado,
        setTicket,
        setOt,
    } = useContext(SACContext)
    const [mensaje, setMensaje] = useState(null)
    const [errorTicket, setErrorTicket] = useState(false)
    const [errorDestino, setErrorDestino] = useState(false)
    const [confirmacion, setConfirmacion] = useState(false)
    const [ayudaDestino, setAyudaDestino] = useState(false)

    const validationSchema = Yup.object({
        numtic: Yup.string()
            .required()
            .test('NoCero', numtic => {
                return numtic !== '0'
            }),
        numotr: Yup.number().required().min(1),
    })

    // Referencias para acceder al DOM de algunos campos
    const formRef = useRef()
    const destinRef = useRef()
    const numticRef = useRef()
    const fecrecRef = useRef()

    const { setDestinActual, leaveDestin } = useLeaveDestin()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const gestionErrores = mensaje => {
        const inicio = mensaje.indexOf(':') + 2
        const fin = mensaje.indexOf('(') - 1
        setMensaje(mensaje.substring(inicio, fin))

        if (mensaje.match(/ticket/)) {
            setErrorTicket(true)
            numticRef.current.select()
        }

        if (mensaje.match(/destino/)) {
            setErrorDestino(true)
            destinRef.current.select()
        }
    }

    const handleSubmit = (e, values) => {
        e.preventDefault()

        if (!values) {
            setMensaje('Error al obtener los datos del registro.')
            return
        }

        if (values.numtic.toString().indexOf(',') > 0)
            values.numtic = parseInt(values.numtic.replace(',', ''))

        guardaPotiag(values, registroActual).then(respuesta => {
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

                history.push('/potiag')
            } else {
                const error = respuesta.request.response._errors[0]._errorMsg
                gestionErrores(error)
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

        borrarPotiag(registroActual).then(() => setRegistroBorrado(true))
    }

    const handleCancelarConfirmacion = () => {
        setConfirmacion(false)
    }

    const handleNuevo = () => {
        guardaRegistroActual(null)
        setInitialValues({
            numreg: 0,
            numtic: 0,
            numotr: 0,
            destin: 0,
            destinDescri: '',
            priori: '',
            fecrec: '',
            observ: '',
        })
        numticRef.current.focus()
    }

    /* Leave del campo destin: buscamos la descripción del valor introducido */
    const handleBlurDestin = (e, setFieldValue) => {
        const nuevoValor = parseInt(e.target.value)
        leaveDestin(nuevoValor, setFieldValue)
    }

    const handleCancelarDestinoRecordatorio = () => {
        setAyudaDestino(false)
    }

    const handleAceptarDestinoRecordatorio = registroDestino => {
        setAyudaDestino(false)
        formRef.current.setFieldValue('destin', registroDestino.CODDES)
        formRef.current.setFieldValue('destinDescri', registroDestino.DESCRI)
    }

    const limpiarDestino = () => {
        formRef.current.setFieldValue('destin', 0)
        formRef.current.setFieldValue('destinDescri', '')
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        // Inicializaciones
        registroActual && numticRef.current.select()

        setRegistroCreado(false)

        if (registroActual) {
            setDestinActual(registroActual.destin)
            setInitialValues(registroActual)
        } else {
            setInitialValues({
                numreg: 0,
                numtic: 0,
                numotr: 0,
                destin: 0,
                destinDescri: '',
                priori: '',
                fecrec: '',
                observ: '',
            })
        }
    }, [registroActual])

    useEffect(() => {
        if (!registroCreado && !registroModificado && !registroBorrado) return

        history.push('/potiag')
    }, [registroCreado, registroModificado, registroBorrado])

    useEffect(() => {
        if (!ticket || !ot) return

        formRef.current.setFieldValue('numtic', ticket)
        formRef.current.setFieldValue('numotr', ot)

        return setTicket(null) && setOt(null)
    }, [ticket, ot])

    useEffect(() => {
        numticRef.current.focus()
    }, [])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalAyudaDestinoRecordatorio
                mostrarModal={ayudaDestino}
                handleAceptarDestinoRecordatorio={
                    handleAceptarDestinoRecordatorio
                }
                handleCancelarDestinoRecordatorio={
                    handleCancelarDestinoRecordatorio
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
                        setFieldValue,
                    } = formik
                    return (
                        <form
                            className='form'
                            onSubmit={e => handleSubmit(e, values)}
                        >
                            <h1 className='form__h1'>
                                Mantenimiento de Recordatorios de Tickets
                            </h1>
                            {mensaje && (
                                <Alerta mensaje={mensaje} tipo='error' />
                            )}
                            <section className='form__section span-2'>
                                <article className='grid col-2'>
                                    <div>
                                        <label
                                            className='form__label'
                                            htmlFor='numtic'
                                        >
                                            Nº de Ticket/OT
                                        </label>
                                        <div className='bloque-campo'>
                                            <NumberFormat
                                                className='campo'
                                                id='numtic'
                                                name='numtic'
                                                alineacion='right'
                                                thousandSeparator={true}
                                                value={values.numtic}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'numtic',
                                                        e.target.value
                                                    )
                                                }
                                                getInputRef={el =>
                                                    (numticRef.current = el)
                                                }
                                                // customInput={alineacion => (
                                                //     <Campo
                                                //         alineacion={alineacion}
                                                //     />
                                                // )}
                                                // customInput={Campo}
                                            />
                                            <NumberFormat
                                                className='campo input-ot'
                                                id='numotr'
                                                name='numotr'
                                                alineacion='right'
                                                thousandSeparator={true}
                                                value={values.numotr}
                                                onChange={e => {
                                                    setFieldValue(
                                                        'numotr',
                                                        e.target.value
                                                    )
                                                }}
                                                // customInput={alineacion => (
                                                //     <input
                                                //         className='campo'
                                                //         type='text'
                                                //         alineacion={alineacion}
                                                //     />
                                                // )}
                                                // customInput={Campo}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className='form__label'
                                            htmlFor='priori'
                                        >
                                            Prioridad
                                        </label>
                                        <div className='grid col-2'>
                                            <select
                                                className='selector'
                                                id='priori'
                                                name='priori'
                                                value={values.priori}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'priori',
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option></option>
                                                <option>Baja</option>
                                                <option>Media</option>
                                                <option>Alta</option>
                                                <option>Muy Alta</option>
                                            </select>
                                        </div>
                                    </div>
                                </article>
                                <article className='grid col-2'>
                                    <div>
                                        <label
                                            className='form__label'
                                            htmlFor='fecrec'
                                        >
                                            Fecha Recordatorio
                                        </label>
                                        <input
                                            type='date'
                                            className='campo'
                                            id='fecrec'
                                            //name='fecrec'
                                            value={values.fecrec}
                                            onChange={e => {
                                                setFieldValue(
                                                    'fecrec',
                                                    fecrecRef.current.value
                                                )
                                            }}
                                            onBlur={handleBlur}
                                            ref={fecrecRef}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className='form__label'
                                            htmlFor='destin'
                                        >
                                            Destino
                                        </label>
                                        <div className='bloque-campo'>
                                            <NumberFormat
                                                className='campo'
                                                id='destin'
                                                name='destin'
                                                alineacion='right'
                                                value={values.destin}
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'destin',
                                                        e.target.value
                                                    )
                                                }
                                                // customInput={alineacion => (
                                                //     <Campo
                                                //         alineacion={alineacion}
                                                //     />
                                                // )}
                                                //customInput={Campo}
                                                getInputRef={el =>
                                                    (destinRef.current = el)
                                                }
                                                onBlur={e =>
                                                    handleBlurDestin(
                                                        e,
                                                        setFieldValue
                                                    )
                                                }
                                            />
                                            <button
                                                className='icono-buscar'
                                                type='button'
                                                title='Seleccionar destino'
                                                onClick={() =>
                                                    setAyudaDestino(true)
                                                }
                                            >
                                                <i className='fas fa-search'></i>
                                            </button>
                                            <input
                                                className='campo descripcion'
                                                id='destinDescri'
                                                type='text'
                                                disabled
                                                value={values.destinDescri}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'destinDescri',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                className='icono-borrar'
                                                type='button'
                                                title='Borrar selección destino'
                                                onClick={limpiarDestino}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                </article>
                                <article>
                                    <label htmlFor='observ'>
                                        Observaciones
                                    </label>
                                    <textarea
                                        className='editor'
                                        rows='5'
                                        id='observ'
                                        value={values.observ}
                                        onChange={e =>
                                            setFieldValue(
                                                'observ',
                                                e.target.value
                                            )
                                        }
                                        //onBlur={handleBlur}
                                    ></textarea>
                                </article>
                                <footer className='form__footer'>
                                    {registroActual ? (
                                        <button
                                            className='btn btn-ancho'
                                            type='button'
                                            onClick={handleBorrar}
                                        >
                                            Borrar
                                        </button>
                                    ) : (
                                        <button
                                            className='btn-disabled btn-ancho'
                                            type='button'
                                        >
                                            Borrar
                                        </button>
                                    )}
                                    <div>
                                        <button
                                            className='btn btn-nuevo'
                                            type='reset'
                                            onClick={handleNuevo}
                                        >
                                            Nuevo
                                        </button>
                                        <button
                                            className='btn btn-ancho'
                                            type='submit'
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </footer>
                            </section>
                        </form>
                    )
                }}
            </Formik>
        </>
    )
}

export default FormularioPotiag
