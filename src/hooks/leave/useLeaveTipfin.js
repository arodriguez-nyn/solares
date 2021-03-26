import { useState } from 'react'

// Servicios
import { obtenerRegistrosTipfin } from '../../services/tipfin'

/* Estado para guardar el valor anterior de los campos auxiliares, para
    evitar consultas innecesarias a la bbdd
*/
const useLeaveTipfin = () => {
    const [tipfinActual, setTipfinActual] = useState(null)

    const leaveTipfin = (nuevoValor, setFieldValue) => {
        const filtro = `CODTIP = ${nuevoValor}`

        tipfinActual !== nuevoValor &&
            obtenerRegistrosTipfin(filtro).then(jsdo => {
                const { success, request } = jsdo
                if (success) {
                    const ttTipfin = request.response.dsTIPFIN.ttTIPFIN

                    if (ttTipfin) {
                        const registro = ttTipfin[0] // Sólo habrá un registro
                        setFieldValue('tipfinDescri', registro.DESCRI)
                        setTipfinActual(registro.CODTIP)
                    } else {
                        setFieldValue('tipfinDescri', '')
                    }
                } else {
                    console.log(jsdo)
                }
            })
    }

    return { setTipfinActual, leaveTipfin }
}

export default useLeaveTipfin
