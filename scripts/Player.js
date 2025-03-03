import * as System from './main.js'
import * as myMath from './myMath.js'



// Variables para el jugador.
const width = 20
const height = 120



class Player {
	constructor(side) {
		this.side = side
		this.position = {x: 0, y: 0 }
	}



	// Función de inicialización del jugador.
	start() {
		// Establecimiento de la posición vértical.
		this.position.y = System.halfHeight - height/2

		// Establecimiento de la posición horizontal.
		if (this.side == "left") {
				this.position.x = width * 2
		} else	this.position.x = System.unscaledWidth - width * 3
	}



	// Función de actualización del jugador.
	update(Up, Down) {
		
	}



	// Función de dibujado para el jugador.
	draw() {
		System.ctx.fillStyle = "fff"
		System.ctx.fillRect(
			myMath.redondeo(this.position.x * System.scale, 1),
			myMath.redondeo(this.position.y * System.scale, 1),
			myMath.redondeo(width * System.scale, 1),
			myMath.redondeo(height * System.scale, 1)
		)
	}
}



export { Player, width }