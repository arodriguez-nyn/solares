import React, { useState, useEffect, useContext } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'
import { formateaNumero } from '../../../util'

// Componentes
import { Boton, TablaEstilos, WrapperTabla } from '../../../componentes/UI'
import Alerta from '../../../componentes/Alerta'
import Navegacion from '../../../componentes/Navegacion'
import ModalLoading from '../../../componentes/modales/ModalLoading'
import { ContenedorTabla } from './styledComponents'

// Hooks
import useNavegacion from '../../../hooks/useNavegacion'

// Contexto
import SolaresContext from '../../../context/SolaresContext'

// Servicios
import { obtenerRegistrosDefiso } from '../../../services/defiso'

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
        ordenacionDetalle,
        guardaRegistroDetalleActual,
        setRegistroDetalleCreado,
        setRegistroDetalleModificado,
        setRegistroDetalleBorrado,
        setPaginaDetalle,
        guardaOrdenacionDetalle,
    } = useContext(SolaresContext)
    const [mensaje, setMensaje] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const listaOrdenacion = [
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
            recalcularPrecioTotal: false,
        }
        guardaRegistroDetalleActual(defiso)
        history.push('/defiso/formulario')
    }

    const handleNuevo = () => {
        guardaRegistroDetalleActual(null)
        setRegistroDetalleCreado(null)
        setRegistroDetalleBorrado(null)
        setRegistroDetalleModificado(null)

        history.push('/solares/defiso/formulario')
    }

    const modificaOrdenacion = campo => {
        let campoOrdenacion = ''
        switch (campo) {
            case 'F. Entrega':
                campoOrdenacion = {
                    nombre: 'FECENT',
                    descripcion: 'F. Entrega',
                }
                break
            case 'F. Entrega Desc':
                campoOrdenacion = {
                    nombre: 'FECENT DESC',
                    descripcion: 'F. Entrega Desc',
                }
                break
            case 'Agente':
                campoOrdenacion = {
                    nombre: 'AGINMO_NOMBRE',
                    descripcion: 'Agente',
                }
                break
            case 'Agente Desc':
                campoOrdenacion = {
                    nombre: 'AGINMO_NOMBRE DESC',
                    descripcion: 'Agente Desc',
                }
                break
            case 'Teléfono':
                campoOrdenacion = {
                    nombre: 'NUMTEL',
                    descripcion: 'Teléfono',
                }
                break
            case 'Teléfono Desc':
                campoOrdenacion = {
                    nombre: 'NUMTEL DESC',
                    descripcion: 'Teléfono Desc',
                }
                break
            case 'Precio B/R':
                campoOrdenacion = {
                    nombre: 'PRECBR',
                    descripcion: 'Precio B/R',
                }
                break
            case 'Precio B/R Desc':
                campoOrdenacion = {
                    nombre: 'PRECBR DESC',
                    descripcion: 'Precio B/R Desc',
                }
                break
            case 'Precio S/R':
                campoOrdenacion = {
                    nombre: 'PRECSR',
                    descripcion: 'Precio S/R',
                }
                break
            case 'Precio S/R Desc':
                campoOrdenacion = {
                    nombre: 'PRECSR DESC',
                    descripcion: 'Precio S/R Desc',
                }
                break
            case 'Precio Total':
                campoOrdenacion = {
                    nombre: 'PRETOT',
                    descripcion: 'Precio Total',
                }
                break
            case 'Precio Total Desc':
                campoOrdenacion = {
                    nombre: 'PRETOT DESC',
                    descripcion: 'Precio Total Desc',
                }
                break
            case 'Repercusión B/R':
                campoOrdenacion = {
                    nombre: 'REPEBR',
                    descripcion: 'Repercusión B/R',
                }
                break
            case 'Repercusión B/R Desc':
                campoOrdenacion = {
                    nombre: 'REPEBR DESC',
                    descripcion: 'Repercusión B/R Desc',
                }
                break
            case 'Repercusión S/R':
                campoOrdenacion = {
                    nombre: 'REPESR',
                    descripcion: 'Repercusión S/R',
                }
                break
            case 'Repercusión S/R Desc':
                campoOrdenacion = {
                    nombre: 'REPESR DESC',
                    descripcion: 'Repercusión S/R Desc',
                }
                break
            case 'Arrendatarios':
                campoOrdenacion = {
                    nombre: 'ARREND',
                    descripcion: 'Arrendatarios',
                }
                break
            case 'Arrendatarios Desc':
                campoOrdenacion = {
                    nombre: 'ARREND DESC',
                    descripcion: 'Arrendatarios Desc',
                }
                break
            case 'Rentabilidad':
                campoOrdenacion = {
                    nombre: 'RENTAB',
                    descripcion: 'Rentabilidad',
                }
                break
            case 'Rentabilidad Desc':
                campoOrdenacion = {
                    nombre: 'RENTAB DESC',
                    descripcion: 'Rentabilidad Desc',
                }
                break
            case 'Rep. Arrend':
                campoOrdenacion = {
                    nombre: 'REPARR',
                    descripcion: 'Rep. Arrend',
                }
                break
            case 'Rep. Arrend Desc':
                campoOrdenacion = {
                    nombre: 'REPARR DESC',
                    descripcion: 'Rep. Arrend Desc',
                }
                break
            case 'Oferta NN':
                campoOrdenacion = {
                    nombre: 'OFERTA',
                    descripcion: 'Oferta NN',
                }
                break
            case 'Oferta NN Desc':
                campoOrdenacion = {
                    nombre: 'OFERTA DESC',
                    descripcion: 'Oferta NN Desc',
                }
                break
            case 'Rep. Oferta':
                campoOrdenacion = {
                    nombre: 'REPOFE',
                    descripcion: 'Rep. Oferta',
                }
                break
            case 'Rep. Oferta Desc':
                campoOrdenacion = {
                    nombre: 'REPOFE DESC',
                    descripcion: 'Rep. Oferta Desc',
                }
                break
        }

        setOrderBy(campoOrdenacion)
        guardaOrdenacionDetalle(campoOrdenacion)
    }

    const limpiaAlertas = () => {
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
        if (!registroActual) return

        if (ordenacionDetalle && ordenacionDetalle.nombre)
            setOrderBy(ordenacionDetalle.nombre)

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
    }, [registroActual, registroDetalleActual, ordenacionDetalle])

    useEffect(() => {
        setPaginaDetalle(paginaActual)
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
                    {lista && (
                        <Navegacion
                            campoOrdenacion={ordenacionDetalle}
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
                            <span>{`${numeroRegistros} ${
                                numeroRegistros > 1 ? 'registros' : 'registro'
                            }`}</span>
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
