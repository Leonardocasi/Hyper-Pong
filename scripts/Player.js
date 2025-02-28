import * as System from './main.js'



// Variables para el jugador
const width = 20
const height = 120



class Player {
	constructor(x, keyUp, keyDown) {
		this.position = {x, y: 0 }
	}



	// Función de inicialización del jugador
	start() {
		this.position.y = System.halfHeight - height/2
	}



	// Función de dibujado para el jugador
	draw() {
		System.ctx.fillStyle = "fff"
		System.ctx.fillRect(
			(this.position.x * System.scale).toFixed(1),
			(this.position.y * System.scale).toFixed(1),
			(width * System.scale).toFixed(1),
			(height * System.scale).toFixed(1)
		)
	}
}



export { Player, width, height }