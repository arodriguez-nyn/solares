import React, { useState, useEffect, useContext } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'
import { formateaNumero, formateaFecha } from '../../../util'

// Componentes
import Alerta from '../../../componentes/Alerta'
import Navegacion from '../../../componentes/Navegacion'
//import FiltroTablaPodeag from '../../../componentes/FiltroTablaPodeag'
import ModalLoading from '../../../componentes/modales/ModalLoading'

// Hooks
import useNavegacion from '../../../hooks/useNavegacion'

// Contexto
import SACContext from '../../../context/SACContext'
import AppContext from '../../../context/AppContext'

// Servicios
import { obtenerRegistrosPotiag } from '../../../services/potiag'

import './styles.css'

const TablaPotiag = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const { usuario, guardaUsuario } = useContext(AppContext)
    const {
        paginaCabecera,
        ordenacion,
        filtroActual,
        registroCreado,
        registroModificado,
        registroBorrado,
        guardaRegistroActual,
        setRegistroCreado,
        setRegistroModificado,
        setRegistroBorrado,
        guardaOrdenacion,
        setPaginaCabecera,
    } = useContext(SACContext)
    const [mensaje, setMensaje] = useState(null)
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const listaOrdenacion = [
        'Ticket',
        'Ticket Desc',
        'Destino',
        'Destino Desc',
        'Prioridad',
        'Prioridad Desc',
        'F. Recordatorio',
        'F. Recordatorio Desc',
    ]

    // Datos para la navegación
    const tabla = 'potiag'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = filtro => {
        if (!usuario) return

        setLoading(true)

        obtenerRegistrosPotiag(filtro).then(
            jsdo => {
                setLoading(false)
                if (!jsdo) {
                    // Sesión caducada
                    localStorage.removeItem('sac-usuario')

                    guardaUsuario(null)
                    history.push('/')
                    return
                }

                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsPOTIAG.ttPOTIAG
                    if (lista) {
                        setLista(lista)
                    } else {
                        setLista(null)
                    }
                } else {
                    console.log('jsdo', jsdo)
                }
            },
            error => console.log('error tablaPotiag', error)
        )
    }

    const handleClick = registro => {
        if (!registro) return

        setRegistroCreado(null)
        setRegistroBorrado(null)
        setRegistroModificado(null)

        const potiag = {
            numreg: registro.NUMREG,
            numtic: registro.NUMTIC,
            numotr: registro.NUMOTR,
            destin: registro.DESTIN,
            priori: registro.PRIORI,
            fecrec: registro.FECREC,
            destinDescri: registro.DESTIN_DESCRI,
            observ: registro.OBSERV,
        }

        guardaRegistroActual(potiag)
        history.push('/potiag/formulario')
    }

    const handleNuevo = () => {
        guardaRegistroActual(null)
        setRegistroCreado(null)
        setRegistroBorrado(null)
        setRegistroModificado(null)

        history.push('/potiag/formulario')
    }

    const modificaOrdenacion = campo => {
        let campoOrdenacion = ''
        switch (campo) {
            case 'Ticket':
                campoOrdenacion = { nombre: 'NUMTIC', descripcion: 'Ticket' }
                break
            case 'Ticket Desc':
                campoOrdenacion = {
                    nombre: 'NUMTIC DESC',
                    descripcion: 'Ticket Desc',
                }
                break
            case 'Destino':
                campoOrdenacion = { nombre: 'DESTIN', descripcion: 'Destino' }
                break
            case 'Destino Desc':
                campoOrdenacion = {
                    nombre: 'DESTIN DESC',
                    descripcion: 'Destino Desc',
                }
                break
            case 'Prioridad':
                campoOrdenacion = {
                    nombre: 'PRIORI',
                    descripcion: 'Prioridad',
                }
                break
            case 'Prioridad Desc':
                campoOrdenacion = {
                    nombre: 'PRIORI DESC',
                    descripcion: 'Prioridad Desc',
                }
                break
            case 'F. Recordatorio':
                campoOrdenacion = {
                    nombre: 'FECREC',
                    descripcion: 'F. Recordatorio',
                }
                break
            case 'F. Recordatorio Desc':
                campoOrdenacion = {
                    nombre: 'FECREC DESC',
                    descripcion: 'F. Recordatorio Desc',
                }
                break
        }
        setOrderBy(campoOrdenacion)
        guardaOrdenacion(campoOrdenacion)
    }

    const limpiaAlertas = () => {
        setRegistroCreado(null)
        setRegistroBorrado(null)
        setRegistroModificado(null)
        setMensaje(null)
    }

    // Hook para la paginación
    const {
        paginaActual,
        numeroPaginas,
        numeroRegistros,
        setPaginaActual,
        setAblFilter,
        setOrderBy,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
        modificaNumeroLineas,
    } = useNavegacion({
        tabla,
        obtenerRegistros,
        limpiaAlertas,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!usuario) return

        if (ordenacion && ordenacion.nombre) setOrderBy(ordenacion.nombre)

        setAblFilter(filtroActual)
        setPaginaActual(paginaCabecera ? paginaCabecera : 1)

        // Mensajes por acciones en otras pantallas
        if (registroCreado) {
            setMensaje({
                texto: 'Registro creado correctamente.',
                tipo: 'exito',
            })
        }
        if (registroModificado) {
            setMensaje({
                texto: 'Registro modificado correctamente.',
                tipo: 'exito',
            })
        }
        if (registroBorrado) {
            setMensaje({
                texto: 'Registro borrado correctamente.',
                tipo: 'exito',
            })
        }
    }, [usuario, filtroActual, ordenacion])

    useEffect(() => {
        setPaginaCabecera(paginaActual)
    }, [paginaActual])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalLoading mostrarModal={loading} color='#fff' />
            <section className='wrapper-tabla'>
                <h1 className='wrapper-tabla__h1'>Recordatorio de Tickets</h1>
                <div className='contenedor-tabla'>
                    {/* <FiltroTablaPodeag obtenerRegistros={obtenerRegistros} /> */}
                    {lista && (
                        <Navegacion
                            campoOrdenacion={ordenacion}
                            ordenacion={listaOrdenacion}
                            paginaActual={paginaActual}
                            numeroPaginas={numeroPaginas}
                            handleAnterior={handleAnterior}
                            handleSiguiente={handleSiguiente}
                            handlePrimero={handlePrimero}
                            handleUltimo={handleUltimo}
                            modificaNumeroLineas={modificaNumeroLineas}
                            modificaOrdenacion={modificaOrdenacion}
                        />
                    )}
                    <h2 className='contenedor-tabla__h2'>
                        Recordatorios Registrados
                    </h2>
                    {mensaje && (
                        <Alerta mensaje={mensaje.texto} tipo={mensaje.tipo} />
                    )}
                    <table className='tabla'>
                        <thead className='tabla__thead'>
                            <tr className='thead__tr'>
                                <th className='tabla__th'>Ticket</th>
                                <th className='tabla__th'>OT</th>
                                <th className='tabla__th'>Destino</th>
                                <th className='tabla__th'>Prioridad</th>
                                <th className='tabla__th'>F. Recordatorio</th>
                                <th className='tabla__th'>Observaciones</th>
                            </tr>
                        </thead>
                        <tbody className='tabla__tbody'>
                            {lista &&
                                lista.length > 0 &&
                                lista.map(registro => (
                                    <tr
                                        className='tabla__tr'
                                        onClick={() => handleClick(registro)}
                                        key={registro.NUMREG}
                                    >
                                        <td className='tabla__td align-right'>
                                            {formateaNumero(registro.NUMTIC)}
                                        </td>
                                        <td className='tabla__td align-right'>
                                            {formateaNumero(registro.NUMOTR)}
                                        </td>
                                        <td className='tabla__td'>
                                            {registro.DESTIN_DESCRI}
                                        </td>
                                        <td className='tabla__td'>
                                            {registro.PRIORI}
                                        </td>
                                        <td className='tabla__td align-center'>
                                            {formateaFecha(registro.FECREC)}
                                        </td>
                                        <td className='tabla__td'>
                                            {registro.OBSERV}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <footer className='contenedor-tabla__footer'>
                        {numeroRegistros !== 0 && (
                            <span>{`${numeroRegistros} ${
                                numeroRegistros > 0 ? 'registros' : 'registro'
                            }`}</span>
                        )}
                        <button
                            className='btn btn-nuevo'
                            type='button'
                            onClick={handleNuevo}
                        >
                            Nuevo
                        </button>
                    </footer>
                </div>
            </section>
        </>
    )
}

export default TablaPotiag
