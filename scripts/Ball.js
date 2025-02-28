import * as System from './main.js'
import * as EventController from './EventController.js'
import * as Trigo from './trigonometry.js'

class Ball {
	constructor(x, y) {
		this.position = { x, y }
		this.speed = { x: 0, y: 0 }		// Velocidad, valor vectorial.
		this.velocity = 15				// Rapidez, valor escalar.
		this.angle = 155				// ángulo en grados.

		this.size = 20
	}



	// Función para la iniciación
	start() {
		// Obtención de las componentes de velocidad
		this.speed = this.speedCalculation(this.velocity, this.angle)
	}



	// Función de actualización de la pelota.
	update() {
		// Colisión Superior
		if (this.position.y <= 0) {
			this.speed.y = -this.speed.y
		}

		// Colisión inferior
		if ((this.position.y + this.size) >= System.unscaledHeight) {
			this.speed.y = -this.speed.y
		}

		// Colision lateral derecha 
		if (this.position.x >= System.unscaledWidth) {
			EventController.start()						// Reinicio del juego
		}

		// Colisión lateral izquierda
		if (this.position.x + this.size <= 0) {
			EventController.start()						// Reinicio del juego
		}


		// Actualización de la posición de la pelota
		//this.position.x += this.speed.x * System.DeltaTime
		//this.position.y += this.speed.y * System.DeltaTime
	}



	// Función de dibujado de la pelota.
	draw() {
		System.ctx.fillStyle = "#fff"
		System.ctx.fillRect(
			(this.position.x * System.scale).toFixed(1),
			(this.position.y * System.scale).toFixed(1),
			(this.size * System.scale).toFixed(1),
			(this.size * System.scale).toFixed(1)
		)
	}



	// Función para calcular las componentes verticales y horizontales de la velocidad.
	speedCalculation(velocity, angle) {
		let x = (velocity * Trigo.cosTable[angle]).toFixed(4)
		let y = (velocity * Trigo.sinTable[angle]).toFixed(4)

		//console.log(x + ", " + y)

		return { x, y }
	}



	// Función para obtener el nuevo ángulo trás la colisión.
	getNewAngle() {

	}
}

export { Ball }