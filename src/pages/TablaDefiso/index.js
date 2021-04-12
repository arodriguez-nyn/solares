import React, { useState, useEffect, useContext } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'
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
import ModalLoading from '../../componentes/modales/ModalLoading'

// Hooks
import useNavegacion from '../../hooks/useNavegacion'

// Contexto
import AppContext from '../../context/AppContext'

// Servicios
import { obtenerRegistrosDefiso } from '../../services/defiso'

import './styles.css'

const TablaDefiso = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const {
        registroActual,
        registroDetalleCreado,
        registroDetalleModificado,
        registroDetalleBorrado,
        registroDetalleActual,
        guardaRegistroDetalleActual,
        setRegistroDetalleCreado,
        setRegistroDetalleModificado,
        setRegistroDetalleBorrado,
    } = useContext(AppContext)
    const [mensaje, setMensaje] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const ordenacion = [
        'F. Entrega',
        'F. Entrega Desc',
        'Agente',
        'Agente Desc',
        'Teléfono',
        'Teléfono Desc',
        'Precio B/R',
        'Precio B/R Desc',
        'Precio S/R',
        'Precio S/R Desc',
        'Precio Total',
        'Precio Total Desc',
        'Repercusión B/R',
        'Repercusión B/R Desc',
        'Repercusión S/R',
        'Repercusión S/R Desc',
        'Arrendatarios',
        'Arrendatarios Desc',
        'Rentabilidad',
        'Rentabilidad Desc',
        'Rep. Arrend',
        'Rep. Arrend Desc',
        'Oferta NN',
        'Oferta NN Desc',
        'Rep. Oferta',
        'Rep. Oferta Desc',
    ]

    // Datos para la navegación
    const tabla = 'defiso'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = filtro => {
        setLoading(true)
        obtenerRegistrosDefiso(filtro).then(jsdo => {
            setLoading(false)
            const { success, request } = jsdo
            if (success) {
                const lista = request.response.dsDEFISO.ttDEFISO
                if (lista) {
                    setLista(lista)
                } else {
                    setLista(null)
                }
            } else {
                console.log(jsdo)
            }
        })
    }

    const handleClick = registro => {
        if (!registro) return

        setRegistroDetalleCreado(null)
        setRegistroDetalleBorrado(null)
        setRegistroDetalleModificado(null)

        const fechaEntrega = registro.FECENT ? registro.FECENT : ''

        const defiso = {
            agente: registro.AGENTE,
            aginmoNombre: registro.AGINMO_NOMBRE,
            arrend: registro.ARREND,
            codsit: registro.CODSIT,
            fecent: fechaEntrega,
            numfic: registro.NUMFIC,
            numlin: registro.NUMLIN,
            numtel: registro.NUMTEL,
            observ: registro.OBSERV,
            oferta: registro.OFERTA,
            precbr: registro.PRECBR,
            precsr: registro.PRECSR,
            pretot: registro.PRETOT,
            rentab: registro.RENTAB,
            reparr: registro.REPARR,
            repebr: registro.REPEBR,
            repesr: registro.REPESR,
            repofe: registro.REPOFE,
        }
        guardaRegistroDetalleActual(defiso)
        history.push('/formulario-detalle')
    }

    const handleNuevo = () => {
        guardaRegistroDetalleActual(null)
        setRegistroDetalleCreado(null)
        setRegistroDetalleBorrado(null)
        setRegistroDetalleModificado(null)

        history.push('/formulario-detalle')
    }

    const modificaOrdenacion = campo => {
        let campoOrdenacion = ''
        switch (campo) {
            case 'F. Entrega':
                campoOrdenacion = 'FECENT'
                break
            case 'F. Entrega Desc':
                campoOrdenacion = 'FECENT DESC'
                break
            case 'Agente':
                campoOrdenacion = 'AGINMO_NOMBRE'
                break
            case 'Agente Desc':
                campoOrdenacion = 'AGINMO_NOMBRE DESC'
                break
            case 'Teléfono':
                campoOrdenacion = 'NUMTEL'
                break
            case 'Teléfono Desc':
                campoOrdenacion = 'NUMTEL DESC'
                break
            case 'Precio B/R':
                campoOrdenacion = 'PRECBR'
                break
            case 'Precio B/R Desc':
                campoOrdenacion = 'PRECBR DESC'
                break
            case 'Precio S/R':
                campoOrdenacion = 'PRECSR'
                break
            case 'Precio S/R Desc':
                campoOrdenacion = 'PRECSR DESC'
                break
            case 'Precio Total':
                campoOrdenacion = 'PRETOT'
                break
            case 'Precio Total Desc':
                campoOrdenacion = 'REPCBR DESC'
                break
            case 'Repercusión B/R':
                campoOrdenacion = 'REPEBR'
                break
            case 'Repercusión B/R Desc':
                campoOrdenacion = 'REPEBR DESC'
                break
            case 'Repercusión S/R':
                campoOrdenacion = 'REPESR'
                break
            case 'Repercusión S/R Desc':
                campoOrdenacion = 'REPESR DESC'
                break
            case 'Arrendatarios':
                campoOrdenacion = 'ARREND'
                break
            case 'Arrendatarios Desc':
                campoOrdenacion = 'ARREND DESC'
                break
            case 'Rentabilidad':
                campoOrdenacion = 'RENTAB'
                break
            case 'Rentabilidad Desc':
                campoOrdenacion = 'RENTAB DESC'
                break
            case 'Rep. Arrend':
                campoOrdenacion = 'REPARR'
                break
            case 'Rep. Arrend Desc':
                campoOrdenacion = 'REPARR DESC'
                break
            case 'Oferta NN':
                campoOrdenacion = 'OFERTA'
                break
            case 'Oferta NN Desc':
                campoOrdenacion = 'OFERTA DESC'
                break
            case 'Rep. Oferta':
                campoOrdenacion = 'REPOFE'
                break
            case 'Rep. Oferta Desc':
                campoOrdenacion = 'REPOFE DESC'
                break
        }

        setOrderBy(campoOrdenacion)
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
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!registroActual) return

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
    }, [registroActual, registroDetalleActual])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalLoading mostrarModal={loading} color='#fff' />
            <ContenedorTabla>
                <h1>Solares</h1>
                <WrapperTabla>
                    {lista && (
                        <Navegacion
                            ordenacion={ordenacion}
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
                    <h2>Listado Detalle de Solares</h2>
                    {mensaje && <Alerta mensaje={mensaje} tipo='exito' />}
                    <TablaEstilos>
                        <thead>
                            <tr>
                                <th>F. Entrega</th>
                                <th>Agente</th>
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
                            {lista &&
                                lista.length > 0 &&
                                lista.map(registro => (
                                    <tr
                                        onClick={() => handleClick(registro)}
                                        key={`${registro.NUMFIC}-${registro.NUMLIN}`}
                                    >
                                        <td className='align-center'>
                                            {registro.FECENT}
                                        </td>
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
        </>
    )
}

export default TablaDefiso
