import React, { useState, useEffect } from 'react'

// Dependencias
import { progress } from '@progress/jsdo-core'
import { obtenerConexion } from '../../services'

// Componentes
import { Boton, ContenedorModalAyuda, TablaAyuda, WrapperAyuda } from '../UI'
import Navegacion from '../../componentes/Navegacion'
import { parametrosConsulta, contarRegistros } from '../../services'

const ModalAyudaCalificacionUrbanistica = ({
    mostrarModal,
    handleAceptarAyudaCalificacionUrbanistica,
    handleCancelarAyudaCalificacionUrbanistica,
}) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const [paginaActual, setPaginaActual] = useState(0)
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = filtro => {
        mostrarModal &&
            obtenerConexion().then(() => {
                const jsdo = new progress.data.JSDO({ name: 'calurb' })

                jsdo.fill(filtro).then(
                    jsdo => {
                        const { success, request } = jsdo
                        if (success) {
                            const lista = request.response.dsCALURB.ttCALURB
                            setLista(lista)
                            console.log(lista)
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
        handleAceptarAyudaCalificacionUrbanistica(registro)
    }

    const handleCancel = () => {
        handleCancelarAyudaCalificacionUrbanistica()
    }

    const handleSiguiente = () => {
        const pagina =
            paginaActual < numeroPaginas ? paginaActual + 1 : numeroPaginas

        setPaginaActual(pagina)
    }

    const handleAnterior = () => {
        const pagina = paginaActual > 1 ? paginaActual - 1 : paginaActual

        setPaginaActual(pagina)
    }

    const handlePrimero = () => {
        setPaginaActual(1)
    }

    const handleUltimo = () => {
        setPaginaActual(numeroPaginas)
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        contarRegistros('', 'calurb').then(numeroRegistros => {
            setNumeroRegistros(numeroRegistros)
            setNumeroPaginas(
                Math.round(numeroRegistros / parametrosConsulta.lineasPorPagina)
            )
        })

        mostrarModal && setPaginaActual(1)
    }, [mostrarModal])

    useEffect(() => {
        const parametros = {
            skip: (paginaActual - 1) * parametrosConsulta.lineasPorPagina,
            top: parametrosConsulta.lineasPorPagina,
        }
        paginaActual !== 0 && obtenerRegistros(parametros)
    }, [paginaActual])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            {mostrarModal && (
                <ContenedorModalAyuda>
                    <WrapperAyuda>
                        <h2>Listado de Calificaciones Urbanísticas</h2>
                        <Navegacion
                            buttonSize='20px'
                            paginaActual={paginaActual}
                            numeroPaginas={numeroPaginas}
                            handleAnterior={handleAnterior}
                            handleSiguiente={handleSiguiente}
                            handlePrimero={handlePrimero}
                            handleUltimo={handleUltimo}
                        />
                        <TablaAyuda>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Cód. Calif.</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.length > 0 &&
                                    lista.map(registro => (
                                        <tr
                                            onClick={() =>
                                                handleClick(registro)
                                            }
                                            key={registro.CODCAL}
                                        >
                                            <td>{registro.CODCAL}</td>
                                            <td>{registro.CODIGO}</td>
                                            <td>{registro.DESCRI}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </TablaAyuda>
                        <footer>
                            {numeroRegistros !== 0 && (
                                <span>{`${numeroRegistros} registros`}</span>
                            )}
                            <Boton
                                width='120px'
                                type='button'
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Boton>
                        </footer>
                    </WrapperAyuda>
                </ContenedorModalAyuda>
            )}
        </>
    )
}

export default ModalAyudaCalificacionUrbanistica
