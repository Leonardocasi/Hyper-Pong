import * as EventController from './EventController.js'



// Inicialización del entorno.
const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let lastWidth = innerWidth
let lastHeight = innerHeight

let scale = 1



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



// Variables para los controles.
const Key = {
	Player1Up:		false,
	Player1Down:	false,
	Player1Serve:	false,
	Player1Power:	false,
	
	Player2Up:		false,
	Player2Down:	false,
	Player2Serve:	false,
	Player2Power:	false,

	Esc:			false,
	Enter:			false,
}

const cursor = {
	x: 0, 
	y: 0,

	active: false,

	// antiguos.
	lastx: 0,
	lasty: 0
}



// Función principal. Inicialización general.
function main() {
	newRes()

	window.onload = function() {
		EventController.start()
		requestAnimationFrame(mainLoop)
	}
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

	cursor.lastx = cursor.x
	cursor.lasty = cursor.y
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



// Detección del presionado de una tecla.
addEventListener('keydown', ({keyCode}) => {
	commuteKey(keyCode, true)
	// Ocultar el mouse tras presionar una tecla.
	document.body.style.cursor = 'none';
	cursor.active = false
})

// Detección del alza de una tecla.
addEventListener('keyup', ({keyCode}) => {
	commuteKey(keyCode, false)
})


// Mostrar el mouse tras moverlo.
document.onmousemove = function() { 
	document.body.style.cursor = 'auto';
}


canvas.addEventListener('mousemove', function(event) {
	cursor.active = true

	// Obtén las coordenadas del borde del canvas
    const rect = canvas.getBoundingClientRect()
    
    // Calcula las coordenadas x y y del cursor con respecto al canvas
    cursor.x = Math.round((event.clientX - rect.left) / scale)
    cursor.y = Math.round((event.clientY - rect.top) / scale)
})


// Función de alternación para Keys
function commuteKey(keyCode, State) {
	switch (keyCode) {

		// Movimiento del jugador 1.
		case 87:	Key.Player1Up = State;		break
		case 83:	Key.Player1Down = State;	break
		case 68:	Key.Player1Serve = State;	break
		case 65:	Key.Player1Power = State;	break

		// Movimiento del jugador 2.
		case 38:	Key.Player2Up = State;		break
		case 40:	Key.Player2Down = State;	break
		case 37:	Key.Player2Serve = State;	break
		case 39:	Key.Player2Power = State;	break

		// Adicionales importantes.
		case 27:	Key.Esc = State;			break
		case 13:	Key.Enter = State;			break
	}
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

	// Controles
	Key,
	cursor
}