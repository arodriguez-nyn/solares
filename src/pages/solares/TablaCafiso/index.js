import React, { useState, useEffect, useContext } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'
import { formateaNumero } from '../../../util'

// Componentes
import { Boton, TablaEstilos, WrapperTabla } from '../../../componentes/UI'
import Alerta from '../../../componentes/Alerta'
import Navegacion from '../../../componentes/Navegacion'
import FiltroTablaCafiso from '../../../componentes/FiltroTablaCafiso'
import ModalLoading from '../../../componentes/modales/ModalLoading'
import { ContenedorTabla } from './styledComponents'

// Hooks
import useNavegacion from '../../../hooks/useNavegacion'

// Contexto
import AppContext from '../../../context/AppContext'
import SolaresContext from '../../../context/SolaresContext'

// Servicios
import { obtenerRegistrosCafiso } from '../../../services/cafiso'

import './styles.css'

const TablaCafiso = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const { usuario } = useContext(AppContext)
    const {
        ordenacion,
        filtroActual,
        paginaCabecera,
        registroCreado,
        registroModificado,
        registroBorrado,
        guardaRegistroActual,
        setRegistroCreado,
        setRegistroModificado,
        setRegistroBorrado,
        guardaOrdenacion,
        guardaUsuario,
        setPaginaCabecera,
    } = useContext(SolaresContext)

    const [mensaje, setMensaje] = useState(null)
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const listaOrdenacion = [
        'Carpeta',
        'Carpeta Desc',
        'Dirección',
        'Dirección Desc',
        'Población',
        'Población Desc',
        'Propietario',
        'Propietario Desc',
        'Tipo Inmueble',
        'Tipo Inmueble Desc',
        'Cal. Urbanística',
        'Cal. Urbanística Desc',
    ]

    // Datos para la navegación
    const tabla = 'cafiso'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = filtro => {
        if (!usuario) return

        setLoading(true)

        obtenerRegistrosCafiso(filtro).then(
            jsdo => {
                setLoading(false)
                if (!jsdo) {
                    // Sesión caducada
                    localStorage.removeItem('solares-usuario')
                    guardaUsuario(null)
                    history.push('/')
                    return
                }

                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsCAFISO.ttCAFISO
                    if (lista) {
                        setLista(lista)
                    } else {
                        setLista(null)
                    }
                } else {
                    console.log('jsdo', jsdo)
                }
            },
            error => console.log('error TablaCafiso', error)
        )
    }

    const handleClick = registro => {
        if (!registro) return

        setRegistroCreado(null)
        setRegistroBorrado(null)
        setRegistroModificado(null)

        const cafiso = {
            numfic: registro.NUMFIC,
            direcc: registro.DIRECC,
            locali: registro.LOCALI,
            tipfin: registro.TIPFIN,
            tipfinDescri: registro.TIPFIN_DESCRI,
            califi: registro.CALIFI,
            calurb: registro.CALURB_CODIGO,
            calurbDescri: registro.CALURB_DESCRI,
            edacsr: registro.EDACSR,
            edacbr: registro.EDACBR,
            edposr: registro.EDPOSR,
            edpobr: registro.EDPOBR,
            prosol: registro.PROSOL,
            supsol: registro.SUPSOL,
            arm: registro.ARM,
            profed: registro.PROFED,
            longfa: registro.LONGFA,
            ficgen: registro.FICGEN,
        }

        guardaRegistroActual(cafiso)
        history.push('/cafiso/formulario')
    }

    const handleNuevo = () => {
        guardaRegistroActual(null)
        setRegistroCreado(null)
        setRegistroBorrado(null)
        setRegistroModificado(null)

        history.push('/cafiso/formulario')
    }

    const modificaOrdenacion = campo => {
        let campoOrdenacion = ''
        switch (campo) {
            case 'Carpeta':
                campoOrdenacion = { nombre: 'FICGEN', descripcion: 'Carpeta' }
                break
            case 'Carpeta Desc':
                campoOrdenacion = {
                    nombre: 'FICGEN DESC',
                    descripcion: 'Carpeta Desc',
                }
                break
            case 'Dirección':
                campoOrdenacion = { nombre: 'DIRECC', descripcion: 'Dirección' }
                break
            case 'Dirección Desc':
                campoOrdenacion = {
                    nombre: 'DIRECC DESC',
                    descripcion: 'Dirección Desc',
                }
                break
            case 'Población':
                campoOrdenacion = {
                    nombre: 'LOCALI',
                    descripcion: 'Población',
                }
                break
            case 'Población Desc':
                campoOrdenacion = {
                    nombre: 'LOCALI DESC',
                    descripcion: 'Población Desc',
                }
                break
            case 'Propietario':
                campoOrdenacion = {
                    nombre: 'PROSOL',
                    descripcion: 'Propietario',
                }
                break
            case 'Propietario Desc':
                campoOrdenacion = {
                    nombre: 'PROSOL DESC',
                    descripcion: 'Propietario Desc',
                }
                break
            case 'Tipo Inmueble':
                campoOrdenacion = {
                    nombre: 'TIPFIN_DESCRI',
                    descripcion: 'Tipo Inmueble',
                }
                break
            case 'Tipo Inmueble Desc':
                campoOrdenacion = {
                    nombre: 'TIPFIN_DESCRI DESC',
                    descripcion: 'Tipo Inmueble Desc',
                }
                break
            case 'Cal. Urbanística':
                campoOrdenacion = {
                    nombre: 'CALURB_CODIGO',
                    descripcion: 'Cal. Urbanística',
                }
                break
            case 'Cal. Urbanística Desc':
                campoOrdenacion = {
                    nombre: 'CALURB_CODIGO DESC',
                    descripcion: 'Cal. Urbanística Desc',
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
            <ContenedorTabla>
                <h1>Solares</h1>
                <WrapperTabla>
                    <FiltroTablaCafiso obtenerRegistros={obtenerRegistros} />
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
                    <h2>Listado de Solares</h2>
                    {mensaje && (
                        <Alerta mensaje={mensaje.texto} tipo={mensaje.tipo} />
                    )}
                    <TablaEstilos>
                        <thead>
                            <tr>
                                <th>Carpeta</th>
                                <th>Dirección</th>
                                <th>Población</th>
                                <th>Propietario</th>
                                <th>Tipo Inmueble</th>
                                <th>Cal. Urb</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista &&
                                lista.length > 0 &&
                                lista.map(registro => (
                                    <tr
                                        onClick={() => handleClick(registro)}
                                        key={registro.NUMFIC}
                                    >
                                        <td className='align-right'>
                                            {formateaNumero(registro.FICGEN)}
                                        </td>
                                        <td>{registro.DIRECC}</td>
                                        <td>{registro.LOCALI}</td>
                                        <td>{registro.PROSOL}</td>
                                        <td>{registro.TIPFIN_DESCRI}</td>
                                        <td className='align-center'>
                                            {registro.CALURB_CODIGO}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </TablaEstilos>
                    <footer>
                        {numeroRegistros !== 0 && (
                            <span>{`${numeroRegistros} ${
                                numeroRegistros > 0 ? 'registros' : 'registro'
                            }`}</span>
                        )}
                        <Boton
                            width='120px'
                            type='button'
                            onClick={handleNuevo}
                        >
                            Nuevo
                        </Boton>
                    </footer>
                </WrapperTabla>
            </ContenedorTabla>
        </>
    )
}

export default TablaCafiso
