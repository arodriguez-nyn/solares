import React, { useState, useEffect } from 'react'

// Dependencias
import { obtenerRegistrosPodeag } from '../../../services/podeag'

// Componentes
import { Boton, ContenedorModalAyuda, TablaAyuda, WrapperAyuda } from '../../UI'
import Navegacion from '../../../componentes/Navegacion'

// Hooks
import useNavegacion from '../../../hooks/useNavegacion'

const ModalAyudaDestinoRecordatorio = ({
    mostrarModal,
    handleAceptarDestinoRecordatorio,
    handleCancelarDestinoRecordatorio,
}) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const tabla = 'podeag'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = filtro => {
        mostrarModal &&
            obtenerRegistrosPodeag(filtro).then(jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsPODEAG.ttPODEAG
                    setLista(lista)
                } else {
                    console.log(jsdo)
                }
            })
    }

    const handleClick = registro => {
        handleAceptarDestinoRecordatorio(registro)
    }

    const handleCancel = () => {
        handleCancelarDestinoRecordatorio()
    }

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
        if (!mostrarModal) return

        setAblFilter('')
        setPaginaActual(1)
    }, [mostrarModal])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            {mostrarModal && (
                <div className='contenedor-ayuda'>
                    <div className='wrapper-ayuda'>
                        <h2 className='wrapper-ayuda__h2'>
                            Listado de Tipos de Finca
                        </h2>
                        <Navegacion
                            buttonSize='20px'
                            paginaActual={paginaActual}
                            numeroPaginas={numeroPaginas}
                            handleAnterior={handleAnterior}
                            handleSiguiente={handleSiguiente}
                            handlePrimero={handlePrimero}
                            handleUltimo={handleUltimo}
                            mostrarNumeroLineas={false}
                        />
                        <table className='tabla-ayuda'>
                            <thead className='tabla-ayuda__thead'>
                                <tr className='tabla-ayuda__tr'>
                                    <th className='tabla-ayuda__th'>Código</th>
                                    <th className='tabla-ayuda__th'>
                                        Descripción
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.length > 0 &&
                                    lista.map(registro => (
                                        <tr
                                            className='tabla-ayuda__tr'
                                            onClick={() =>
                                                handleClick(registro)
                                            }
                                            key={registro.CODDES}
                                        >
                                            <td className='tabla-ayuda__td'>
                                                {registro.CODDES}
                                            </td>
                                            <td className='tabla-ayuda__td'>
                                                {registro.DESCRI}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <footer className='wrapper-ayuda__footer'>
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
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalAyudaDestinoRecordatorio
