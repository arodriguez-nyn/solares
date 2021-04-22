import React, { useState, useEffect } from 'react'

// Dependencias
import { obtenerRegistrosTipfin } from '../../../services/tipfin'

// Componentes
import { Boton, ContenedorModalAyuda, TablaAyuda, WrapperAyuda } from '../../UI'
import Navegacion from '../../../componentes/Navegacion'

// Hooks
import useNavegacion from '../../../hooks/useNavegacion'

const ModalAyudaTipoFinca = ({
    mostrarModal,
    handleAceptarAyudaTipoFinca,
    handleCancelarAyudaTipoFinca,
}) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const tabla = 'tipfin'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = filtro => {
        mostrarModal &&
            obtenerRegistrosTipfin(filtro).then(jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsTIPFIN.ttTIPFIN
                    setLista(lista)
                } else {
                    console.log(jsdo)
                }
            })
    }

    const handleClick = registro => {
        handleAceptarAyudaTipoFinca(registro)
    }

    const handleCancel = () => {
        handleCancelarAyudaTipoFinca()
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
                <ContenedorModalAyuda>
                    <WrapperAyuda>
                        <h2>Listado de Tipos de Finca</h2>
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
                                            key={registro.CODTIP}
                                        >
                                            <td>{registro.CODTIP}</td>
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

export default ModalAyudaTipoFinca
