// Archivos de audio.

// Efectos de sonido.
const sceneHit = new Audio('audio/sceneHit.wav')
const paddleHit = new Audio('audio/paddleHit.wav')

// Música de fondo
const background = new Audio()



// Funciones para la ejecución del audio.
function play(audioFile) {
	audioFile.pause()
	audioFile.load()
	audioFile.play()
}

function pause(audioFile) {
	audioFile.pause()
}

function resume(audioFile) {
	audioFile.play()
}



export {
	// Funciones.
	play,
	pause,
	resume,

	// Archivos de audio.
	sceneHit,
	paddleHit
}