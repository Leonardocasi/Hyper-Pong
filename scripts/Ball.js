import * as System from './main.js'
import * as EventController from './EventController.js'
import * as myMath from './myMath.js'
import * as Scene from './Scene.js'



class Ball {
	constructor(x, y) {
		this.position = { x, y }
		this.speed = { x: 0, y: 0 }		// Velocidad, valor vectorial.
		this.velocity = 15				// Rapidez, valor escalar.
		this.angle = 180				// ángulo en grados.

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
		if (Math.round(this.position.y) <= Math.round(this.radius + Scene.density)) {
			this.position.y = this.radius + Scene.density
			this.speed.y *= -1
		}

		// Colisión inferior
		if (Math.round(System.unscaledHeight - this.position.y) <= Math.round(this.radius + Scene.density)) {
			this.position.y = System.unscaledHeight - this.radius - Scene.density
			this.speed.y *= -1
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
			myMath.redondeo(this.position.x * System.scale, 1),
			myMath.redondeo(this.position.y * System.scale, 1),
			myMath.redondeo(this.radius * System.scale, 1),
			0,		// Angulo de inicio
			6.2832,	// Angulo final (Ambos en radianes)
			false
		)
		System.ctx.fillStyle = "#fff"
		System.ctx.fill()
		System.ctx.closePath()
	}



	// Función para calcular las componentes verticales y horizontales de la velocidad.
	speedCalculation(velocity, angle) {
		let x = myMath.redondeo(velocity * myMath.degCos(angle), 4)
		let y = myMath.redondeo(velocity * myMath.degSin(angle), 4)
		return { x, y }
	}



	// Función para obtener el nuevo ángulo trás la colisión.
	getNewAngle(x, y) {
		this.angle = myMath.degAtan(x, y)
	}
}



export { Ball }