import { useState, useEffect } from 'react'

import { parametrosConsulta, contarRegistros } from '../services'

const useNavegacion = ({ tabla, obtenerRegistros }) => {
    const [paginaActual, setPaginaActual] = useState(0)
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [ablFilter, setAblFilter] = useState(null)

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

    useEffect(() => {
        const parametros = {
            skip:
                (Math.max(paginaActual, 1) - 1) *
                parametrosConsulta.lineasPorPagina,
            top: parametrosConsulta.lineasPorPagina,
        }
        parametros.filter = ablFilter

        paginaActual !== 0 && obtenerRegistros(parametros)
    }, [paginaActual])

    useEffect(() => {
        /* Tenemos que poner específicamente !== null porque si está en blanco
           no funciona la llamada condicional */
        ablFilter !== null &&
            contarRegistros(ablFilter, tabla).then(numeroRegistros => {
                setNumeroRegistros(numeroRegistros)
                setNumeroPaginas(
                    Math.round(
                        numeroRegistros / parametrosConsulta.lineasPorPagina
                    )
                )
            })
    }, [ablFilter])

    return {
        paginaActual,
        numeroPaginas,
        numeroRegistros,
        setPaginaActual,
        setAblFilter,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
        setNumeroPaginas,
        setNumeroRegistros,
    }
}

export default useNavegacion
