import { useState } from 'react'

// Servicios
import { obtenerRegistrosCalurb } from '../../services/calurb'

/* Estado para guardar el valor anterior de los campos auxiliares, para
    evitar consultas innecesarias a la bbdd
*/
const useLeaveCalurb = () => {
    const [calurbActual, setCalurbActual] = useState(null)

    const leaveCalurb = (nuevoValor, setFieldValue) => {
        const filtro = `CODCAL = ${nuevoValor}`

        calurbActual !== nuevoValor &&
            obtenerRegistrosCalurb(filtro).then(jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const ttCalurb = request.response.dsCALURB.ttCALURB

                    if (ttCalurb) {
                        const registro = ttCalurb[0] // Sólo habrá un registro
                        setFieldValue('calurb', registro.CODIGO)
                        setFieldValue('calurbDescri', registro.DESCRI)
                        setCalurbActual(registro.CODCAL)
                    } else {
                        setFieldValue('calurb', '')
                        setFieldValue('calurbDescri', '')
                    }
                } else {
                    console.log(jsdo)
                }
            })
    }

    return { setCalurbActual, leaveCalurb }
}

export default useLeaveCalurb
