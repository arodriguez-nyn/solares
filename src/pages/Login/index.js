import React, { useState, useRef, useEffect, useContext } from 'react'

// Componentes
import ModalLoading from '../../componentes/modales/ModalLoading'
import Alerta from 'componentes/Alerta'

// Dependencias
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'

// Contexto
import AppContext from '../../context/AppContext'
import SACContext from '../../context/SACContext'

// Servicios
import { conectar } from '../../services/comun'
import { obtenerRegistrosUsuari } from '../../services/usuari'

// Estilos
import './styles.css'

import logo from '/static/img/logo-horiz-nn-rgb-amarillo.svg'

const Login = ({ location }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [initialValues] = useState({
        nombre: '',
        password: '',
    })
    const validationSchema = Yup.object({
        nombre: Yup.string().required('El nombre de usuario es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria'),
    })
    const formRef = useRef()
    const [loading] = useState(false)
    const [mensaje, setMensaje] = useState(null)
    const [errorNombre, setErrorNombre] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const history = useHistory()
    const { guardaUsuario } = useContext(AppContext)
    const { setTicket, setOt } = useContext(SACContext)

    // Referencias para acceder al DOM de algunos campos
    const nombreRef = useRef()
    const passwordRef = useRef()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const login = (nombre, password) => {
        conectar(nombre, password).then(
            respuesta => {
                const { result } = respuesta
                if (result === 1 || result === 3) {
                    return obtenerRegistrosUsuari(`USUARI = '${nombre}'`).then(
                        respuestaUsuario => {
                            if (respuestaUsuario) {
                                const usuario = {
                                    codigo:
                                        respuestaUsuario.request.response
                                            .dsUSUARI.ttUSUARI[0].USUARI,
                                    nombre:
                                        respuestaUsuario.request.response
                                            .dsUSUARI.ttUSUARI[0].CONCEP,
                                }
                                guardaUsuario(usuario)

                                //history.push('/cafiso')
                                if (nombre === 'sac') {
                                    history.push('/potiag/formulario')
                                } else {
                                    history.push('/potiag')
                                }
                            }
                        },
                        error => {
                            console.log('Error al obtener el usuario', error)
                        }
                    )
                } else {
                    guardaUsuario(null)
                    setMensaje('Usuario o contraseña incorrectos.')
                }
            },
            error => {
                console.log('error login', error)
            }
        )
    }

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

        login(nombre, password)
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!errorNombre) return

        nombreRef.current.select()
    }, [errorNombre])

    useEffect(() => {
        if (!errorPassword) return

        passwordRef.current.select()
    }, [errorPassword])

    useEffect(() => {
        nombreRef.current.select()

        const usuarioString = localStorage.getItem('SAC-usuario')
        const usuario = JSON.parse(usuarioString)

        //if (usuario) history.push('/cafiso')
        if (usuario) history.push('/potiag')

        const obtieneParametros = () => {
            const queryParams = location.search
            const queryString = queryParams.split('&')

            const parametros = queryString[0].split('=')[1]

            const parametroTicket = parametros.split('-')[0]
            const parametroOT = parametros.split('-')[1]

            setTicket(parametroTicket)
            setOt(parametroOT)

            login('sac', 'sac')
        }

        location && location.search !== '' && obtieneParametros()
    }, [])

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
                    const { values, setFieldValue } = formik
                    return (
                        // <PantallaLogin>
                        //     <CajaLogin>
                        //         <img
                        //             src='../static/img/logo-horiz-nn-rgb-amarillo.svg'
                        //             alt='Logo'
                        //         />
                        //         <form onSubmit={e => handleSubmit(e, values)}>
                        //             <h2>Identifícate para iniciar la sesión</h2>
                        //             <CampoAgrupado>
                        //                 {errorNombre ? (
                        //                     <CampoError
                        //                         id='nombre'
                        //                         name='nombre'
                        //                         type='text'
                        //                         autoFocus
                        //                         placeholder='Introduce el código de usuario'
                        //                         value={values.nombre}
                        //                         ref={nombreRef}
                        //                         onChange={e =>
                        //                             setFieldValue(
                        //                                 'nombre',
                        //                                 e.target.value
                        //                             )
                        //                         }
                        //                     />
                        //                 ) : (
                        //                     <Campo
                        //                         id='nombre'
                        //                         name='nombre'
                        //                         type='text'
                        //                         placeholder='Introduce el código de usuario'
                        //                         value={values.nombre}
                        //                         ref={nombreRef}
                        //                         onChange={e =>
                        //                             setFieldValue(
                        //                                 'nombre',
                        //                                 e.target.value
                        //                             )
                        //                         }
                        //                     />
                        //                 )}
                        //                 <i className='fa fa-user'></i>
                        //             </CampoAgrupado>

                        //             <CampoAgrupado>
                        //                 {errorPassword ? (
                        //                     <CampoError
                        //                         id='password'
                        //                         name='password'
                        //                         type='password'
                        //                         placeholder='Introduce la contraseña'
                        //                         value={values.password}
                        //                         ref={passwordRef}
                        //                         onChange={e =>
                        //                             setFieldValue(
                        //                                 'password',
                        //                                 e.target.value
                        //                             )
                        //                         }
                        //                     />
                        //                 ) : (
                        //                     <Campo
                        //                         id='password'
                        //                         name='password'
                        //                         type='password'
                        //                         placeholder='Introduce la contraseña'
                        //                         value={values.password}
                        //                         ref={passwordRef}
                        //                         onChange={e =>
                        //                             setFieldValue(
                        //                                 'password',
                        //                                 e.target.value
                        //                             )
                        //                         }
                        //                     />
                        //                 )}
                        //                 <i className='fa fa-lock color-gray'></i>
                        //             </CampoAgrupado>
                        //             <Boton type='submit' width='100%'>
                        //                 Entrar
                        //             </Boton>
                        //             {mensaje && (
                        //                 <Alerta
                        //                     mensaje={mensaje}
                        //                     tipo='error'
                        //                 />
                        //             )}
                        //         </form>
                        //     </CajaLogin>
                        // </PantallaLogin>
                        <div className='wrapper'>
                            <div className='contenedor'>
                                <img
                                    className='contenedor__logo'
                                    src={logo}
                                    alt='Logo'
                                />
                                <div className='card contenedor__caja-login'>
                                    <form
                                        onSubmit={e => handleSubmit(e, values)}
                                    >
                                        <h2 className='display-2 contenedor__titulo'>
                                            Identifícate para iniciar la sesión
                                        </h2>
                                        <div className='contenedor__campo-agrupado'>
                                            {errorNombre ? (
                                                <input
                                                    className='campo campo-error campo-agrupado__campo'
                                                    id='nombre'
                                                    name='nombre'
                                                    type='text'
                                                    autoFocus
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
                                                <input
                                                    className='campo campo-agrupado__campo'
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
                                            <i className='fa fa-user campo-agrupado__icono'></i>
                                        </div>

                                        <div className='contenedor__campo-agrupado'>
                                            {errorPassword ? (
                                                <input
                                                    className='campo campo-error campo-agrupado__campo'
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
                                                <input
                                                    className='campo campo-agrupado__campo'
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
                                            <i className='fa fa-lock campo-agrupado__icono'></i>
                                        </div>
                                        <button
                                            className='btn contenedor__btn-submit'
                                            type='submit'
                                        >
                                            Entrar
                                        </button>
                                        {mensaje && (
                                            <Alerta
                                                mensaje={mensaje}
                                                tipo='error'
                                            />
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Formik>
        </>
    )
}

export default Login
