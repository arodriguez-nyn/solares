import { useState, useEffect, useContext } from 'react'

import AppContext from 'context/AppContext'

import { contarRegistros } from 'services/comun'

const useNavegacion = ({ tabla, obtenerRegistros, limpiaAlertas }) => {
    const { paginaActual, setPaginaActual } = useContext(AppContext)
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [ablFilter, setAblFilter] = useState(null)
    const [orderBy, setOrderBy] = useState('')
    const [numeroLineas, setNumeroLineas] = useState(10)

    const handleSiguiente = () => {
        console.log(paginaActual)
        const pagina =
            paginaActual < numeroPaginas ? paginaActual + 1 : numeroPaginas

        setPaginaActual(pagina)
        limpiaAlertas()
    }

    const handleAnterior = () => {
        const pagina = paginaActual > 1 ? paginaActual - 1 : paginaActual

        setPaginaActual(pagina)
        limpiaAlertas()
    }

    const handlePrimero = () => {
        setPaginaActual(1)
        limpiaAlertas()
    }

    const handleUltimo = () => {
        setPaginaActual(numeroPaginas)
        limpiaAlertas()
    }

    const modificaNumeroLineas = lineas => {
        setNumeroLineas(lineas)
    }

    useEffect(() => {
        /* Tenemos que poner específicamente !== null porque si está en blanco
            no funciona la llamada condicional */
        if (ablFilter !== null && paginaActual !== 0) {
            const filtro = {
                skip: (Math.max(paginaActual, 1) - 1) * numeroLineas,
                top: parseInt(numeroLineas),
                filter: ablFilter,
                sort: [orderBy],
            }

            obtenerRegistros(filtro)

            contarRegistros(ablFilter, tabla).then(
                numeroRegistros => {
                    if (numeroRegistros < numeroLineas) {
                        setNumeroPaginas(1)
                    } else if (numeroRegistros % numeroLineas === 0) {
                        setNumeroPaginas(
                            Math.round(numeroRegistros / numeroLineas)
                        )
                    } else {
                        setNumeroPaginas(
                            Math.trunc(numeroRegistros / numeroLineas) + 1
                        )
                    }
                    setNumeroRegistros(numeroRegistros)
                },
                error => console.log(error)
            )
        }
    }, [ablFilter, paginaActual, numeroLineas, orderBy])

    return {
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
        setNumeroPaginas,
        setNumeroRegistros,
        modificaNumeroLineas,
    }
}

export default useNavegacion
