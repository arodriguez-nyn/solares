import React, { useState, useEffect, useContext } from 'react'

// Dependencias
import { progress } from '@progress/jsdo-core'
import { useHistory } from 'react-router-dom'
import { obtenerConexion } from '../../services'
import { formateaNumero } from '../../util'

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

const TablaDefiso = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const {
        registroDetalleCreado,
        registroDetalleModificado,
        registroDetalleBorrado,
        registroActual,
        setRegistroDetalleActual,
        setRegistroDetalleCreado,
        setRegistroDetalleModificado,
        setRegistroDetalleBorrado,
    } = useContext(AppContext)
    const [mensaje, setMensaje] = useState(null)
    const history = useHistory()
    // const [paginaActual, setPaginaActual] = useState(0)
    // const [numeroPaginas, setNumeroPaginas] = useState(0)
    // const [numeroRegistros, setNumeroRegistros] = useState(0)

    // Datos para la navegación
    const tabla = 'defiso'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = filtro => {
        obtenerConexion().then(() => {
            const jsdo = new progress.data.JSDO({ name: 'defiso' })
            jsdo.fill(filtro).then(
                jsdo => {
                    const { success, request } = jsdo
                    if (success) {
                        const lista = request.response.dsDEFISO.ttDEFISO
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

        setRegistroDetalleCreado(null)
        setRegistroDetalleBorrado(null)
        setRegistroDetalleModificado(null)

        const defiso = {
            agente: registro.AGENTE,
            nombreAgente: registro.AGINMO_NOMBRE,
            arrend: registro.ARREND,
            codsit: registro.CODSIT,
            fecent: registro.FECENT,
            numfic: registro.NUMFIC,
            numlin: registro.NUMLIN,
            numtel: registro.NUMTEL,
            observ: registro.OBSERV,
            oferta: registro.OFERTA,
            precbr: registro.PRECBR,
            precsr: registro.PRECSR,
            pretoto: registro.PRETOT,
            rentab: registro.RENTAB,
            reparr: registro.REPARR,
            repebr: registro.REPEBR,
            repesr: registro.REPESR,
            repofe: registro.REPOFE,
        }

        setRegistroActual(defiso)
        //history.push('/formulario')
    }

    const handleNuevo = () => {
        setRegistroDetalleActual(null)
        setRegistroDetalleCreado(null)
        setRegistroDetalleBorrado(null)
        setRegistroDetalleModificado(null)

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

    // const handleVolver = () => {
    //     history.push('/formulario')
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
        // contarRegistros('NUMFIC = 1', 'defiso').then(numeroRegistros => {
        //     setNumeroRegistros(numeroRegistros)
        //     setNumeroPaginas(
        //         Math.round(numeroRegistros / parametrosConsulta.lineasPorPagina)
        //     )
        // })

        const ablFilter = registroActual
            ? `NUMFIC = ${registroActual.numfic}`
            : ''

        setAblFilter(ablFilter)
        setPaginaActual(1)

        // Mensajes por acciones en otras pantallas
        if (registroDetalleCreado) {
            setMensaje('Registro creado correctamente.')
        }
        if (registroDetalleModificado) {
            setMensaje('Registro modificado correctamente.')
        }
        if (registroDetalleBorrado) {
            setMensaje('Registro borrado correctamente.')
        }
    }, [registroActual])

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
                <h2>Listado Detalle de Solares</h2>
                {mensaje && <Alerta mensaje={mensaje} tipo='exito' />}
                <TablaEstilos>
                    <thead>
                        <tr>
                            <th>F. Entrega</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Precio B/R</th>
                            <th>Precio S/R</th>
                            <th>Precio Total</th>
                            <th>Repercusión B/R</th>
                            <th>Repercusión S/R</th>
                            <th>Arrendatarios</th>
                            <th>Rentabilidad</th>
                            <th>Rep. Arrend.</th>
                            <th>Oferta NN</th>
                            <th>Rep. Oferta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 &&
                            lista.map(registro => (
                                <tr
                                    onClick={() => handleClick(registro)}
                                    key={`${registro.NUMFIC}-${registro.NUMLIN}`}
                                >
                                    <td>{registro.FECENT}</td>
                                    <td>{registro.AGINMO_NOMBRE}</td>
                                    <td className='align-right'>
                                        {registro.NUMTEL}
                                    </td>
                                    <td className='align-right'>
                                        {formateaNumero(registro.PRECBR)}
                                    </td>
                                    <td className='align-right'>
                                        {formateaNumero(registro.PRECSR)}
                                    </td>
                                    <td className='align-right'>
                                        {formateaNumero(registro.PRETOT)}
                                    </td>
                                    <td className='align-right'>
                                        {formateaNumero(registro.REPEBR)}
                                    </td>
                                    <td className='align-right'>
                                        {formateaNumero(registro.REPESR)}
                                    </td>
                                    <td>{registro.ARREND}</td>
                                    <td className='align-right'>
                                        {formateaNumero(registro.RENTAB)}
                                    </td>
                                    <td className='align-right'>
                                        {formateaNumero(registro.REPARR)}
                                    </td>
                                    <td className='align-right'>
                                        {formateaNumero(registro.OFERTA)}
                                    </td>
                                    <td className='align-right'>
                                        {formateaNumero(registro.REPOFE)}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </TablaEstilos>
                <footer>
                    {numeroRegistros !== 0 && (
                        <span>{`${numeroRegistros} registros`}</span>
                    )}
                    <div>
                        {/* <Boton
                            width='120px'
                            type='button'
                            onClick={handleVolver}
                        >
                            Volver
                        </Boton> */}
                        <Boton
                            width='120px'
                            type='button'
                            onClick={handleNuevo}
                        >
                            Nuevo
                        </Boton>
                    </div>
                </footer>
            </WrapperTabla>
        </ContenedorTabla>
    )
}

export default TablaDefiso
