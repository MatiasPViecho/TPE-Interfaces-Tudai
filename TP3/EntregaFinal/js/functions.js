/**
 * getRelativePos(event)
 * @param {*} event: Evento de mouse
 * @returns {x, y}: Posición relativa al objeto que generó el evento
 * 
 * En el caso del canvas devuelve el (x, y) relativo al canvas
 */
export function getRelativePos(event) {
    const objectPos = event.target.getBoundingClientRect();
    return {
        x: event.clientX - objectPos.x,
        y: event.clientY - objectPos.y
    }
}

/**
 * selectRandom( array)
 * @param {*} array 
 * @returns objeto random perteneciente al array
 */
export function selectRandom( array) {
    return array[Math.floor(Math.random() * array.length)];
}
