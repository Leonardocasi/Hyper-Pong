import * as System from './main.js'
import * as myMath from './myMath.js'
import {Balls} from './EventController.js'



// Variables para el jugador.
const width = 20
const height = 100



class Player {
	constructor(side) {
		this.side = side
		this.position = {x: 0, y: 0 }

		this.speed = 8
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
		if (Up)		this.position.y -= this.speed * System.DeltaTime
		if (Down)	this.position.y += this.speed * System.DeltaTime

		this.ballColition()
	}



	ballColition() {
		Balls.forEach(Ball => {
			let closestX = Math.max(this.position.x, Math.min(Ball.position.x, this.position.x + width))
			let closestY = Math.max(this.position.y, Math.min(Ball.position.y, this.position.y + height))

			let distanceX = Ball.position.x - closestX
			let distanceY = Ball.position.y - closestY

			let distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

			if (distance <= Ball.radius) {
				Ball.speed.x *= -1
				console.log(`Colisión en: (${closestX}, ${closestY})`)
			}
		})
	}



	// Función de dibujado para el jugador.
	draw() {
		System.ctx.fillStyle = "#fff"
		System.ctx.fillRect(
			myMath.redondeo(this.position.x * System.scale, 1),
			myMath.redondeo(this.position.y * System.scale, 1),
			myMath.redondeo(width * System.scale, 1),
			myMath.redondeo(height * System.scale, 1)
		)
	}
}



export { Player, width }