import { useState } from 'react'

// Servicios
import { obtenerRegistrosPodeag } from '../../services/podeag'

/* Estado para guardar el valor anterior de los campos auxiliares, para
    evitar consultas innecesarias a la bbdd
*/
const useLeaveDestin = () => {
    const [destinDescri, setDestinActual] = useState(null)

    const leaveDestin = (nuevoValor, setFieldValue) => {
        const filtro = `CODDES = ${nuevoValor}`

        destinDescri !== nuevoValor &&
            obtenerRegistrosPodeag(filtro).then(jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const ttPodeag = request.response.dsPODEAG.ttPODEAG

                    if (ttPodeag) {
                        const registro = ttPodeag[0] // Sólo habrá un registro

                        setFieldValue('destinDescri', registro.DESCRI)
                        setDestinActual(registro.CODDES)
                    } else {
                        setFieldValue('destinDescri', '')
                    }
                } else {
                    console.log(jsdo)
                }
            })
    }

    return { setDestinActual, leaveDestin }
}

export default useLeaveDestin
