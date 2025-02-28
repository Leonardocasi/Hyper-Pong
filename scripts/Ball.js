import * as System from './main.js'
import * as EventController from './EventController.js'
import * as Trigo from './trigonometry.js'

class Ball {
	constructor(x, y) {
		this.position = { x, y }
		this.speed = { x: 0, y: 0 }		// Velocidad, valor vectorial.
		this.velocity = 15				// Rapidez, valor escalar.
		this.angle = 70				// ángulo en grados.

		this.size = 20
		this.radius = this.size/2
	}



	// Función para la iniciación
	start() {
		// Obtención de las componentes de velocidad
		this.speed = this.speedCalculation(this.velocity, this.angle)
	}



	// Función de actualización de la pelota.
	update() {
		// Colisión Superior
		if (Math.round(this.position.y) <= Math.round(this.radius + System.SceneDensity)) {
			this.position.y = this.radius + System.SceneDensity
			this.speed.y *= -1

			//this.speed.x = 0
			//this.speed.y = 0
		}

		// Colisión inferior
		if (Math.round(System.unscaledHeight - this.position.y) <= Math.round(this.radius + System.SceneDensity)) {
			this.position.y = System.unscaledHeight - this.radius - System.SceneDensity
			this.speed.y *= -1

			//this.speed.x = 0
			//this.speed.y = 0
		}

		// Colision lateral derecha 
		if (Math.round(System.unscaledWidth - this.position.x) < -this.radius) {
			EventController.start()						// Reinicio del juego
		}

		// Colisión lateral izquierda
		if (Math.round(this.position.x) < -this.radius) {
			EventController.start()						// Reinicio del juego
		}


		// Actualización de la posición de la pelota
		this.position.x += this.speed.x * System.DeltaTime
		this.position.y += this.speed.y * System.DeltaTime
	}



	// Función de dibujado de la pelota.
	draw() {
		// Dibujo
		System.ctx.beginPath()
		System.ctx.arc(
			(this.position.x * System.scale).toFixed(1),
			(this.position.y * System.scale).toFixed(1),
			(this.radius * System.scale).toFixed(1),
			0,		// Angulo de inicio
			6.2832,	// Angulo final (Ambos en radianes)
			false
		)
		System.ctx.fillStyle = "#fff"
		System.ctx.fill()
		System.ctx.closePath()

		// Dibujado del centro. 
		System.ctx.fillStyle = "#000"
		System.ctx.fillRect(
			((this.position.x-1) * System.scale).toFixed(1),
			((this.position.y-1) * System.scale).toFixed(1),
			(2 * System.scale).toFixed(1),
			(2 * System.scale).toFixed(1)
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