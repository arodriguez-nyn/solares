import React, { useState, useEffect, useContext } from 'react'

// Dependencias
import { progress } from '@progress/jsdo-core'
import { useHistory } from 'react-router-dom'
import { obtenerConexion } from '../../services'

// Componentes
import {
    Boton,
    TablaEstilos,
    ContenedorTabla,
    WrapperTabla,
} from '../../componentes/UI'
import Alerta from '../../componentes/Alerta'
import Navegacion from '../../componentes/Navegacion'

// Hooks
import useNavegacion from '../../hooks/useNavegacion'

// Contexto
import AppContext from '../../context/AppContext'

import './styles.css'

const TablaCafiso = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const {
        registroCreado,
        registroModificado,
        registroBorrado,
        setRegistroActual,
        setRegistroCreado,
        setRegistroModificado,
        setRegistroBorrado,
    } = useContext(AppContext)
    const [mensaje, setMensaje] = useState(null)
    const history = useHistory()
    // const [paginaActual, setPaginaActual] = useState(0)
    // const [numeroPaginas, setNumeroPaginas] = useState(0)
    // const [numeroRegistros, setNumeroRegistros] = useState(0)

    // Datos para la navegación
    const tabla = 'cafiso'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = filtro => {
        obtenerConexion().then(() => {
            const jsdo = new progress.data.JSDO({ name: 'cafiso' })

            jsdo.fill(filtro).then(
                jsdo => {
                    const { success, request } = jsdo
                    if (success) {
                        const lista = request.response.dsCAFISO.ttCAFISO
                        setLista(lista)
                    }
                },
                () => {
                    console.log(
                        'Error de lectura. No se han podido obtener los registros'
                    )
                }
            )
        })
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

        setRegistroActual(cafiso)
        history.push('/formulario')
    }

    const handleNuevo = () => {
        setRegistroActual(null)
        setRegistroCreado(null)
        setRegistroBorrado(null)
        setRegistroModificado(null)

        history.push('/formulario')
    }

    // const handleSiguiente = () => {
    //     const pagina =
    //         paginaActual < numeroPaginas ? paginaActual + 1 : numeroPaginas

    //     setPaginaActual(pagina)
    // }

    // const handleAnterior = () => {
    //     const pagina = paginaActual > 1 ? paginaActual - 1 : paginaActual

    //     setPaginaActual(pagina)
    // }

    // const handlePrimero = () => {
    //     setPaginaActual(1)
    // }

    // const handleUltimo = () => {
    //     setPaginaActual(numeroPaginas)
    // }

    // Hook para la paginación
    const {
        paginaActual,
        numeroPaginas,
        numeroRegistros,
        setPaginaActual,
        setAblFilter,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
    } = useNavegacion({
        tabla,
        obtenerRegistros,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        // contarRegistros('', 'cafiso').then(numeroRegistros => {
        //     setNumeroRegistros(numeroRegistros)
        //     setNumeroPaginas(
        //         Math.round(numeroRegistros / parametrosConsulta.lineasPorPagina)
        //     )
        // })

        setAblFilter('')
        setPaginaActual(1)

        // Mensajes por acciones en otras pantallas
        if (registroCreado) {
            setMensaje('Registro creado correctamente.')
        }
        if (registroModificado) {
            setMensaje('Registro modificado correctamente.')
        }
        if (registroBorrado) {
            setMensaje('Registro borrado correctamente.')
        }
    }, [])

    // useEffect(() => {
    //     const parametros = {
    //         skip: (paginaActual - 1) * parametrosConsulta.lineasPorPagina,
    //         top: parametrosConsulta.lineasPorPagina,
    //     }
    //     paginaActual !== 0 && obtenerRegistros(parametros)
    // }, [paginaActual])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <ContenedorTabla>
            <h1>Solares</h1>
            <WrapperTabla>
                <Navegacion
                    paginaActual={paginaActual}
                    numeroPaginas={numeroPaginas}
                    handleAnterior={handleAnterior}
                    handleSiguiente={handleSiguiente}
                    handlePrimero={handlePrimero}
                    handleUltimo={handleUltimo}
                />
                <h2>Listado de Solares</h2>
                {mensaje && <Alerta mensaje={mensaje} tipo='exito' />}
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
                        {lista.length > 0 &&
                            lista.map(registro => (
                                <tr
                                    onClick={() => handleClick(registro)}
                                    key={registro.NUMFIC}
                                >
                                    <td className='align-right'>
                                        {registro.FICGEN}
                                    </td>
                                    <td>{registro.DIRECC}</td>
                                    <td>{registro.LOCALI}</td>
                                    <td>{registro.PROSOL}</td>
                                    <td>{registro.TIPFIN_DESCRI}</td>
                                    <td className='align-right'>
                                        {registro.CALURB_CODIGO}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </TablaEstilos>
                <footer>
                    {numeroRegistros !== 0 && (
                        <span>{`${numeroRegistros} registros`}</span>
                    )}
                    <Boton width='120px' type='button' onClick={handleNuevo}>
                        Nuevo
                    </Boton>
                </footer>
            </WrapperTabla>
        </ContenedorTabla>
    )
}

export default TablaCafiso
