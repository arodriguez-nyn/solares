/* -------------------------------------------------------------------- */
/* ---------------------- LIBRERÍA DE UTILIDADES ---------------------- */
/* -------------------------------------------------------------------- */

export const formateaNumero = numeroOriginal => {
    return parseFloat(numeroOriginal)
        .toLocaleString('es')
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
