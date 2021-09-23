import React, { useState, useEffect, useContext } from 'react'

// Dependencias
import shortid from 'shortid'

// Componentes
import { TablaEstilos } from '../../../componentes/UI'
import {
    FormularioEstilos,
    ContenedorTabla,
    WrapperTabla,
    InputFile,
} from './styledComponents'
import ModalLoading from '../../../componentes/modales/ModalLoading'
import Alerta from '../../../componentes/Alerta'

// Servicios
import {
    obtenerArchivosDocumentacion,
    obtieneArchivo,
    muestraCarpeta,
    upload,
} from '../../../services/cafiso'

// Contexto
import AppContext from '../../../context/AppContext'

const Documentacion = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [archivos, setArchivos] = useState([])
    const [loading, setLoading] = useState(false)

    const { registroActual } = useContext(AppContext)
    const [mensaje, setMensaje] = useState(null)
    const [carpetaPadre, setCarpetaPadre] = useState('')
    const [carpetaActual, setCarpetaActual] = useState('')
    const [raiz, setRaiz] = useState('')

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleAgregarArchivo = e => {
        if (!registroActual) return

        const formData = new FormData()
        /*const carpeta =
            !carpetaPadre ||
            typeof carpetaPadre === 'undefined' ||
            carpetaPadre === ''
                ? `${raiz}\${registroActual.ficgen}`
                : carpetaPadre*/

        formData.append('archivos', e.target.files[0])
        //upload(formData, registroActual.ficgen).then(respuesta => {
        upload(formData, carpetaActual).then(respuesta => {
            const { tipo, msg } = respuesta

            setMensaje({
                tipo,
                msg,
            })

            if (tipo === 'exito') {
                obtenerArchivos(registroActual.numfic)
            }
        })
    }

    const obtenerArchivos = numfic => {
        setLoading(true)
        setMensaje(null)
        obtenerArchivosDocumentacion(numfic).then(
            jsdo => {
                setLoading(false)
                const { success, request } = jsdo
                //console.log(jsdo)
                if (success) {
                    const lista =
                        request.response.dsficheros.dsficheros.ttFICHEROS

                    if (lista) {
                        setArchivos(lista)
                    } else {
                        setArchivos(null)
                    }
                } else {
                    console.log(jsdo)
                }
            },
            error => console.log(error)
        )
    }

    const obtieneFicherosDirectorioActual = archivo => {
        setLoading(true)
        const ruta = archivo.RUTA
        const esCarpeta = archivo.ESCARPETA
        const numfic = archivo.NUMFIC
        setCarpetaActual(archivo.RUTA)
        setCarpetaPadre(archivo.PADRE)
        setMensaje(null)

        if (esCarpeta) {
            muestraCarpeta(numfic, ruta).then(
                jsdo => {
                    setLoading(false)
                    const { success, request } = jsdo
                    if (success) {
                        const lista =
                            request.response.dsficheros.dsficheros.ttFICHEROS

                        if (lista) {
                            setArchivos(lista)
                        } else {
                            setArchivos(null)
                        }
                    } else {
                        console.log(jsdo)
                    }
                },
                error => console.log(error)
            )
        } else {
            obtieneArchivo(ruta).then(respuesta => {
                setLoading(false)
                const memptr = respuesta.request.response.archivo
                const extension = ruta.split('.').pop()

                let ventanaArchivo = window.open('')
                if (extension === 'pdf') {
                    ventanaArchivo.document.write(
                        "<embed width='100%' height='100%' src='data:application/pdf;base64, " +
                            memptr +
                            "'></embed>"
                    )
                } else if (extension === 'xls' || extension === 'xlsx') {
                    ventanaArchivo.document.write(
                        "<embed width='100%' height='100%' src='data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64, " +
                            memptr +
                            "'></embed>"
                    )
                }
            })
        }
    }

    const handleClick = archivo => {
        obtieneFicherosDirectorioActual(archivo)
    }

    const handleVolver = archivo => {
        setMensaje(null)
        registroActual &&
            muestraCarpeta(registroActual.numfic, archivo.PADRE).then(
                jsdo => {
                    setCarpetaActual(carpetaPadre)
                    setLoading(false)
                    const { success, request } = jsdo
                    if (success) {
                        const lista =
                            request.response.dsficheros.dsficheros.ttFICHEROS

                        setCarpetaPadre('')
                        if (lista) {
                            setArchivos(lista)

                            if (carpetaPadre !== '' && raiz !== carpetaPadre) {
                                setCarpetaPadre(lista[0].PADRE)
                            }
                        } else {
                            setArchivos(null)
                        }
                    } else {
                        console.log(jsdo)
                    }
                },
                error => console.log(error)
            )
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!registroActual) return

        const raiz = `\\\\192.168.1.41\\DProgress\\Juridica\\Solares\\${registroActual.ficgen}`
        setRaiz(raiz)
        setCarpetaActual(raiz)

        obtenerArchivos(registroActual.numfic)
    }, [registroActual])

    /* ------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO --------------------------- */
    /* ------------------------------------------------------------------- */
    return (
        <>
            <ModalLoading mostrarModal={loading} color='#fff' />
            <FormularioEstilos>
                <h1>Documentación</h1>
                {mensaje && (
                    <Alerta mensaje={mensaje.msg} tipo={mensaje.tipo} />
                )}
                <section>
                    <ContenedorTabla>
                        {registroActual ? (
                            <h2>{`Lista de Archivos de la Carpeta ${registroActual.ficgen}`}</h2>
                        ) : (
                            <h2>'Lista de Archivos'</h2>
                        )}
                        {archivos &&
                            archivos.length > 0 &&
                            carpetaPadre !== '' && (
                                <h3>
                                    {archivos.map(
                                        (archivo, i) =>
                                            i === 0 && (
                                                <span
                                                    onClick={() =>
                                                        handleVolver(archivo)
                                                    }
                                                >
                                                    {archivo.PADRE}
                                                </span>
                                            )
                                    )}
                                </h3>
                            )}
                        <WrapperTabla>
                            {archivos && archivos.length > 0 && (
                                <TablaEstilos>
                                    <tbody>
                                        {archivos.map(archivo => (
                                            <tr
                                                key={shortid.generate()}
                                                onClick={() =>
                                                    handleClick(archivo)
                                                }
                                            >
                                                <td>
                                                    {archivo.ESCARPETA ? (
                                                        <i className='far fa-folder-open'></i>
                                                    ) : (
                                                        <i className='far fa-file'></i>
                                                    )}
                                                </td>
                                                <td>{archivo.RUTA}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </TablaEstilos>
                            )}
                        </WrapperTabla>
                    </ContenedorTabla>
                    <object type='application/pdf' id='fichero'></object>
                    <footer>
                        <InputFile>
                            <label htmlFor='archivo'>Añadir Archivo... </label>
                            <input
                                id='archivo'
                                type='file'
                                onChange={handleAgregarArchivo}
                            />
                        </InputFile>
                    </footer>
                </section>
            </FormularioEstilos>
        </>
    )
}

export default Documentacion
