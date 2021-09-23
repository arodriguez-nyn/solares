import { useState } from 'react'

// Servicios
import { obtenerRegistrosAginmo } from '../../services/aginmo'

/* Estado para guardar el valor anterior de los campos auxiliares, para
    evitar consultas innecesarias a la bbdd
*/
const useLeaveAginmo = () => {
    const [aginmoActual, setAginmoActual] = useState(null)

    const leaveAginmo = (nuevoValor, setFieldValue) => {
        const filtro = `CODAGE = ${nuevoValor}`

        aginmoActual !== nuevoValor &&
            obtenerRegistrosAginmo(filtro).then(jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const ttAginmo = request.response.dsAGINMO.ttAGINMO

                    if (ttAginmo) {
                        const registro = ttAginmo[0] // Sólo habrá un registro
                        setFieldValue('aginmoNombre', registro.NOMBRE)
                        setAginmoActual(registro.CODAGE)
                    } else {
                        setFieldValue('aginmoNombre', '')
                    }
                } else {
                    console.log(jsdo)
                }
            })
    }

    return { setAginmoActual, leaveAginmo }
}

export default useLeaveAginmo
