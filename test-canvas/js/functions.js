export function getRelativePos(event) {
    const objectPos = event.target.getBoundingClientRect();
    return {
        x: event.clientX - objectPos.x,
        y: event.clientY - objectPos.y
    }
}

export function selectRandom( array) {
    return array[Math.floor(Math.random() * array.length)];
}