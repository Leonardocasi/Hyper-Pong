import * as System from './main.js'
import * as EventController from './EventController.js'
import * as myMath from './myMath.js'
import * as Scene from './Scene.js'



class Ball {
	constructor(x, y, angle) {
		this.position = { x, y }
		this.speed = { x: 0, y: 0 }		// Velocidad, valor vectorial.
		this.velocity = 22				// Rapidez, valor escalar.
		this.angle = angle				// ángulo en grados.

		this.friction = 0.967
		this.frictionTimer = 0

		this.size = 26
		this.radius = this.size/2
	}



	// Función para la iniciación
	start() {
		// Obtención de las componentes de velocidad
		this.speedCalculation()
	}



	// Función de actualización de la pelota.
	update() {
		// Colisión Superior
		if (Math.round(this.position.y) <= Math.round(this.radius + Scene.density)) {
			this.position.y = this.radius + Scene.density
			this.speed.y *= -1
			this.getNewAngle()
		}

		// Colisión inferior
		if (Math.round(System.unscaledHeight - this.position.y) <= Math.round(this.radius + Scene.density)) {
			this.position.y = System.unscaledHeight - this.radius - Scene.density
			this.speed.y *= -1
			this.getNewAngle()
		}



		// Fricción
		if (this.frictionTimer >= 5) {
			this.speed.x *= this.friction
			this.speed.y *= this.friction

			this.frictionTimer = 0
		}


		// Actualización de la posición de la pelota
		this.position.x += this.speed.x * System.DeltaTime
		this.position.y += this.speed.y * System.DeltaTime

		this.frictionTimer += System.DeltaTime
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
	speedCalculation() {
		let x = myMath.redondeo(this.velocity * myMath.degCos(this.angle), 4)
		let y = myMath.redondeo(this.velocity * myMath.degSin(this.angle), 4)
		this.speed = { x, y }
	}



	// Función para obtener el nuevo ángulo trás la colisión.
	getNewAngle() {
		this.angle = myMath.degAtan(this.speed.x, this.speed.y)
	}
}



export { Ball }