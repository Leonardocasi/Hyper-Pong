import * as EventController from './EventController.js'



// Archivos de audio.

// Efectos de sonido.
const sceneHit = new Audio('audio/sceneHit.wav')
const paddleHit = new Audio('audio/paddleHit.wav')
const goal = new Audio('audio/Goal.wav')
const multiBall = new Audio('audio/MultiBall.wav')
const orbeObtained = new Audio('audio/OrbeObtained.wav')
const pauseToggle = new Audio('audio/Pause.wav')

// Música de fondo
const background = new Audio()



// Funciones para la ejecución del audio.
function play(audioFile) {
	if (EventController.audioEnabled) {
		audioFile.pause()
		audioFile.load()
		audioFile.play()
	}
}

function pause(audioFile) {
	if (EventController.audioEnabled) {
		audioFile.pause()
	}
}

function resume(audioFile) {
	if (EventController.audioEnabled) {
		audioFile.play()
	}
}



export {
	// Funciones.
	play,
	pause,
	resume,

	// Archivos de audio.
	sceneHit,
	paddleHit,
	goal,
	multiBall,
	orbeObtained,
	pauseToggle,
}