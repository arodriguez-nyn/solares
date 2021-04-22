import React, { useState, useRef, useEffect, useContext } from 'react'

// Componentes
import {
    Campo,
    CampoError,
    CampoObligatorio,
    Boton,
} from '../../componentes/UI'
import { PantallaLogin, CajaLogin } from './styledComponents'
import ModalLoading from '../../componentes/modales/ModalLoading'
import Alerta from '../../componentes/Alerta'

// Dependencias
import { Formik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

// Contexto
import AppContext from '../../context/AppContext'

// Servicios
import { conectar } from '../../services/comun'

const Login = () => {
    /* ------------------------------------------------------------------- */
    /* ------------------------- STYLED COMPONENTS ----------------------- */
    /* ------------------------------------------------------------------- */
    const CampoAgrupado = styled.div`
        position: relative;

        svg {
            position: absolute;
            color: var(--font-color);
            right: 10px;
            top: 5px;
            z-index: 10;
            pointer-events: none;
        }
    `

    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [initialValues, setInitialValues] = useState({
        nombre: '',
        password: '',
    })
    const validationSchema = Yup.object({
        nombre: Yup.string().required('El nombre de usuario es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria'),
    })
    const formRef = useRef()
    const [loading, setLoading] = useState(false)
    const [mensaje, setMensaje] = useState(null)
    const [errorNombre, setErrorNombre] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const history = useHistory()
    const { autenticarUsuario } = useContext(AppContext)

    // Referencias para acceder al DOM de algunos campos
    const nombreRef = useRef()
    const passwordRef = useRef()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleSubmit = (e, values) => {
        e.preventDefault()

        if (!values) {
            setMensaje('Las credenciales no puede estar en blanco')
            setErrorNombre(true)
            return
        }

        const { nombre, password } = values
        if (!nombre || nombre === '') {
            setMensaje('Introduce el código de usuario')
            setErrorNombre(true)
            return
        }

        if (!password || password === '') {
            setMensaje('Introduce la contraseña')
            setErrorPassword(true)
            return
        }

        conectar(nombre, password).then(respuesta => {
            const { result } = respuesta
            // console.log('jsdosession en pantalla login', jsdosession)

            if (result === 1 || result === 3) {
                autenticarUsuario(true)
                history.push('/lista')
            } else {
                autenticarUsuario(null)
                setMensaje('Usuario o contraseña incorrectos.')
            }
        })

        // obtenerConexion().then(session => console.log(object))
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    // useEffect(() => {
    //     if (!sesion) return

    //     // console.log('Sesión en useEffect Login', sesion)
    //     // const sesionLocalStorage = JSON.parse(
    //     //     localStorage.getItem('solares-sesion')
    //     // )
    //     // console.log(sesionLocalStorage.connected)

    //     //history.push('/lista')
    // }, [sesion])

    useEffect(() => {
        nombreRef.current.select()
    }, [errorNombre])

    useEffect(() => {
        passwordRef.current.select()
    }, [errorPassword])

    /* ------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO --------------------------- */
    /* ------------------------------------------------------------------- */
    return (
        <>
            <ModalLoading mostrarModal={loading} color='#fff' />
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
                        <PantallaLogin>
                            <CajaLogin>
                                <img
                                    src='static/img/logo-horiz-nn-rgb-amarillo.svg'
                                    alt='Logo'
                                />
                                <form onSubmit={e => handleSubmit(e, values)}>
                                    <h2>Identifícate para iniciar la sesión</h2>
                                    <CampoAgrupado>
                                        {errorNombre ? (
                                            <CampoError
                                                id='nombre'
                                                name='nombre'
                                                type='text'
                                                placeholder='Introduce el código de usuario'
                                                value={values.nombre}
                                                ref={nombreRef}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'nombre',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <Campo
                                                id='nombre'
                                                name='nombre'
                                                type='text'
                                                placeholder='Introduce el código de usuario'
                                                value={values.nombre}
                                                ref={nombreRef}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'nombre',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        )}
                                        <i className='fa fa-user'></i>
                                    </CampoAgrupado>

                                    <CampoAgrupado>
                                        {errorPassword ? (
                                            <CampoError
                                                id='password'
                                                name='password'
                                                type='password'
                                                placeholder='Introduce la contraseña'
                                                value={values.password}
                                                ref={passwordRef}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'password',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <Campo
                                                id='password'
                                                name='password'
                                                type='password'
                                                placeholder='Introduce la contraseña'
                                                value={values.password}
                                                ref={passwordRef}
                                                onChange={e =>
                                                    setFieldValue(
                                                        'password',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        )}
                                        <i className='fa fa-lock color-gray'></i>
                                    </CampoAgrupado>
                                    <Boton type='submit' width='100%'>
                                        Entrar
                                    </Boton>
                                    {mensaje && (
                                        <Alerta
                                            mensaje={mensaje}
                                            tipo='error'
                                        />
                                    )}
                                </form>
                            </CajaLogin>
                        </PantallaLogin>
                    )
                }}
            </Formik>
        </>
    )
}

export default Login
