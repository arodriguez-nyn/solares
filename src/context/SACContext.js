import React, { useState, createContext } from 'react'

const SACContext = createContext()

export const SACContextProvider = ({ children }) => {
    const [registroActual, setRegistroActual] = useState(null)
    const [registroCreado, setRegistroCreado] = useState(false)
    const [registroBorrado, setRegistroBorrado] = useState(false)
    const [registroModificado, setRegistroModificado] = useState(false)
    const [paginaCabecera, setPaginaCabecera] = useState(null)
    const [ticket, setTicket] = useState(null)
    const [ot, setOt] = useState(null)
    const [filtroActual, setFiltroActual] = useState('')
    const [camposFiltro, setCamposFiltro] = useState({
        FICGEN: 0,
        DIRECC: '',
        LOCALI: '',
        PROSOL: '',
    })
    const [ordenacion, setOrdenacion] = useState(null)

    const guardaRegistroActual = registro => {
        setRegistroActual(registro)
    }

    const guardaFiltroActual = filtro => {
        setFiltroActual(filtro)
    }

    const guardaOrdenacion = ordenacion => {
        setOrdenacion(ordenacion)
    }

    return (
        <SACContext.Provider
            value={{
                registroActual,
                registroCreado,
                registroBorrado,
                registroModificado,
                filtroActual,
                ordenacion,
                paginaCabecera,
                camposFiltro,
                ticket,
                ot,
                guardaRegistroActual,
                setRegistroCreado,
                setRegistroBorrado,
                setRegistroModificado,
                guardaFiltroActual,
                guardaOrdenacion,
                setPaginaCabecera,
                setCamposFiltro,
                setPaginaCabecera,
                setTicket,
                setOt,
            }}
        >
            {children}
        </SACContext.Provider>
    )
}

export default SACContext
