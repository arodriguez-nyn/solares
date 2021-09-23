import React, { useState, createContext } from 'react'

const SolaresContext = createContext()

export const SolaresContextProvider = ({ children }) => {
    const [registroActual, setRegistroActual] = useState(null)
    const [registroCreado, setRegistroCreado] = useState(false)
    const [registroBorrado, setRegistroBorrado] = useState(false)
    const [registroModificado, setRegistroModificado] = useState(false)
    const [registroDetalleActual, setRegistroDetalleActual] = useState(null)
    const [registroDetalleCreado, setRegistroDetalleCreado] = useState(false)
    const [registroDetalleBorrado, setRegistroDetalleBorrado] = useState(false)
    const [registroDetalleModificado, setRegistroDetalleModificado] = useState(
        false
    )
    const [paginaCabecera, setPaginaCabecera] = useState(null)
    const [paginaDetalle, setPaginaDetalle] = useState(null)
    const [filtroActual, setFiltroActual] = useState('')
    const [camposFiltro, setCamposFiltro] = useState({
        FICGEN: 0,
        DIRECC: '',
        LOCALI: '',
        PROSOL: '',
    })
    const [ordenacion, setOrdenacion] = useState(null)
    const [ordenacionDetalle, setOrdenacionDetalle] = useState(null)

    const guardaRegistroActual = registro => {
        setRegistroActual(registro)
    }

    const guardaRegistroDetalleActual = registro => {
        setRegistroDetalleActual(registro)
    }

    const guardaFiltroActual = filtro => {
        setFiltroActual(filtro)
    }

    const guardaOrdenacion = ordenacion => {
        setOrdenacion(ordenacion)
    }

    const guardaOrdenacionDetalle = ordenacionDetalle => {
        setOrdenacionDetalle(ordenacionDetalle)
    }

    return (
        <SolaresContext.Provider
            value={{
                registroActual,
                registroCreado,
                registroBorrado,
                registroModificado,
                registroDetalleActual,
                registroDetalleCreado,
                registroDetalleBorrado,
                registroDetalleModificado,
                filtroActual,
                ordenacion,
                ordenacionDetalle,
                paginaCabecera,
                paginaDetalle,
                camposFiltro,
                guardaRegistroActual,
                setRegistroCreado,
                setRegistroBorrado,
                setRegistroModificado,
                guardaRegistroDetalleActual,
                setRegistroDetalleCreado,
                setRegistroDetalleBorrado,
                setRegistroDetalleModificado,
                guardaFiltroActual,
                guardaOrdenacion,
                guardaOrdenacionDetalle,
                setPaginaCabecera,
                setPaginaDetalle,
                setCamposFiltro,
            }}
        >
            {children}
        </SolaresContext.Provider>
    )
}

export default SolaresContext
