import React, { useState, useEffect } from 'react'

// Componentes
import { Boton, ContenedorModalAyuda, TablaAyuda, WrapperAyuda } from '../../UI'
import Navegacion from '../../Navegacion'

// Hooks
import useNavegacion from '../../../hooks/useNavegacion'
import { obtenerRegistrosCalurb } from '../../../services/calurb'

const ModalAyudaCalificacionUrbanistica = ({
    mostrarModal,
    handleAceptarAyudaCalificacionUrbanistica,
    handleCancelarAyudaCalificacionUrbanistica,
}) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const tabla = 'aginmo'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const obtenerRegistros = filtro => {
        mostrarModal &&
            obtenerRegistrosCalurb(filtro).then(jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsCALURB.ttCALURB
                    setLista(lista)
                } else {
                    console.log(jsdo)
                }
            })
    }

    const handleClick = registro => {
        handleAceptarAyudaCalificacionUrbanistica(registro)
    }

    const handleCancel = () => {
        handleCancelarAyudaCalificacionUrbanistica()
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
                        <h2>Listado de Calificaciones Urbanísticas</h2>
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
