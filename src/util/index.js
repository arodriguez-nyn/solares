/* -------------------------------------------------------------------- */
/* ---------------------- LIBRERÍA DE UTILIDADES ---------------------- */
/* -------------------------------------------------------------------- */

export const formateaNumero = numeroOriginal => {
    return parseFloat(numeroOriginal)
        .toLocaleString('es')
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Cambia la fecha para mostrar, de formato AAAA-MM-DD a  DD/MM/AAAA
export const formateaFecha = fechaOriginal => {
    const dia = fechaOriginal.substr(8, 2)
    const mes = fechaOriginal.substr(5, 2)
    const ano = fechaOriginal.substr(0, 4)

    return `${dia}/${mes}/${ano}`
}
