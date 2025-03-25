import * as System from './main.js'
import * as audio from './audio.js'
import * as myMath from './myMath.js'
import * as Scene from './Scene.js'
import { Particle } from './Particle.js'



class Ball {
	constructor(x, y, angle) {
		this.position = { x, y }
		this.speed = { x: 0, y: 0 }		// Velocidad, valor vectorial.

		this.minVelocity = 17			// Valor inicial de velocidad.
		this.velocity = 0				// Rapidez, valor escalar.
		this.angle = angle				// ángulo en grados.

		this.friction = 0.967
		this.frictionTimer = 0

		this.size = 24
		this.radius = this.size/2

		this.past = { x: 0, y: 0 }		// Coordenadas anteriores

		this.PlayerColition = false

		this.particleTimer = 0

		this.particles = []
		this.extraSpeed = false
	}



	// Función para la iniciación
	start() {
		// Establecimiento de velocidad inicial.
		this.velocity = this.minVelocity

		// Obtención de las componentes de velocidad
		this.speedCalculation(this.velocity)
	}



	// Función de actualización de la pelota.
	update() {
		// Colisiones en el escenario.
		// Colisión Superior
		if (Math.round(this.position.y) <= Math.round(this.radius + Scene.density)) {
			this.position.y = this.radius + Scene.density
			this.speed.y *= -1
			this.getNewAngle()
			audio.play(audio.sceneHit)
		}

		// Colisión inferior
		if (Math.round(System.unscaledHeight - this.position.y) <= Math.round(this.radius + Scene.density)) {
			this.position.y = System.unscaledHeight - this.radius - Scene.density
			this.speed.y *= -1
			this.getNewAngle()
			audio.play(audio.sceneHit)
		}


		// Fricción
		if (this.frictionTimer >= 5) {
			this.speed.x *= this.friction
			this.speed.y *= this.friction

			this.frictionTimer = 0
		}


		// Almacenamiento de la posición anterior.
		this.past.x = this.position.x
		this.past.y = this.position.y


		// Actualización de la posición de la pelota
		this.position.x += this.speed.x * System.DeltaTime
		this.position.y += this.speed.y * System.DeltaTime

		this.frictionTimer += System.DeltaTime


		// Reestablecimiento de la verificacion de colisión con el jugador.
		this.PlayerColition = false


		// Control de partículas
		this.particleTimer += System.DeltaTime

		if (this.particleTimer > 1) {
			if (this.extraSpeed)	this.particles.push(
					new Particle(this.position.x, this.position.y, '#0094FF', 'circle'),
					new Particle(this.position.x, this.position.y, '#3075FF', 'circle')
				)
			else this.particles.push(
					new Particle(this.position.x, this.position.y, '#FF1414', 'circle'),
					new Particle(this.position.x, this.position.y, '#FF5F32', 'circle')
				)

			this.particleTimer = 0
		}

		this.particles.map(particle => particle.update())
	}



	// Función de dibujado de la pelota.
	draw() {
		// Dibujo de las partículas
		this.particles.map((particle, index) => {
			if (particle.opacity <= 0) {
				this.particles.splice(index, 1)
			} else {
				particle.draw()
			}
		})


		// Dibujo de la pelota
		System.ctx.beginPath()
		System.ctx.arc(
			this.position.x * System.scale,
			this.position.y * System.scale,
			this.radius * System.scale,
			0,		// Angulo de inicio
			6.2832,	// Angulo final (Ambos en radianes)
			false
		)
		System.ctx.fillStyle = "#fff"
		System.ctx.fill()
		System.ctx.closePath()
	}



	// Función para calcular las componentes verticales y horizontales de la velocidad.
	speedCalculation(velocity) {
		let x = myMath.redondeo(velocity * myMath.degCos(this.angle), 4)
		let y = myMath.redondeo(velocity * myMath.degSin(this.angle), 4)
		this.speed = { x, y }
	}



	// Función para obtener el nuevo ángulo trás la colisión.
	getNewAngle() {
		this.angle = myMath.degAtan(this.speed.x, this.speed.y)
	}
}



export { Ball }