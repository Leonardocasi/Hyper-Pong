import * as EventController from './EventController.js'



// Inicialización del entorno.
const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let lastWidth = innerWidth
let lastHeight = innerHeight

let scale = 1



// Variables para el escenario
let SceneDensity = 4



// Resoluciones base para las físicas.
const unscaledWidth = 1280
const unscaledHeight = 720

const halfWidth = unscaledWidth/2
const halfHeight = unscaledHeight/2



// Variables para el DeltaTime
// (Esto hace posible las físicas independientes a los FPS)
const perfectFrames = 1000/60
let DeltaTime = 0
let lastTimeStamp = 0



// Función principal. Inicialización general.
function main() {
	newRes()

	EventController.start()
	requestAnimationFrame(mainLoop)
}



// Función búcle principal del juego.
function mainLoop(timeStamp) {
	requestAnimationFrame(mainLoop)
	DeltaTime = (timeStamp - lastTimeStamp) / perfectFrames
	lastTimeStamp = timeStamp

	if (innerWidth != lastWidth || innerHeight != lastHeight) {
		newRes()

		lastWidth = innerWidth
		lastHeight = innerHeight
	}

	ctx.clearRect(0,0, canvas.width, canvas.height)

	EventController.update()
}



// Reestablecimiento de la resolución real del juego.
function newRes() {
	canvas.width = innerWidth
	canvas.height = canvas.width * 9 / 16
	 
	if (canvas.height > innerHeight) {
		canvas.height = innerHeight
		canvas.width = canvas.height * 16 / 9
	}
	
	scale = canvas.height / 720
}



// Exportación de todas las variables que se utilizarán en otros códigos.
export {
	main,
	canvas,
	ctx,
	DeltaTime,
	scale,

	// Resolución base para las físicas.
	unscaledWidth,
	unscaledHeight,
	halfWidth,
	halfHeight,

	// Variables para el escenario.
	SceneDensity
}