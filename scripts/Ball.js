import * as System from './main.js'
import * as sprites from './Sprites.js'
import * as myMath from './myMath.js'
import { Particle } from './Particle.js'



class Ball {
	constructor(position, angle) {
		this.position = position
		this.speed = { x: 0, y: 0 }		// Velocidad, valor vectorial.

		this.minVelocity = 17			// Valor inicial de velocidad.
		this.velocity = 0				// Rapidez, valor escalar.
		this.angle = angle				// ángulo en grados.

		this.friction = 0.967
		this.frictionTimer = 0

		this.sprite = sprites.Ball
		this.size = 24
		this.spriteSize = this.sprite.naturalWidth
		this.radius = this.size/2

		this.past = { x: 0, y: 0 }		// Coordenadas anteriores

		this.PlayerColition = false

		this.particleTimer = 0
		this.particles = []
		this.extraSpeed = false

		this.normalParticleColor = [ '#FF1414', '#FF5F32' ]
		this.powerParticleColor = ['#0094FF', '#3075FF']
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
					new Particle(this.position.x, this.position.y, this.powerParticleColor[0], 'circle'),
					new Particle(this.position.x, this.position.y, this.powerParticleColor[1], 'circle')
				)
			else this.particles.push(
					new Particle(this.position.x, this.position.y, this.normalParticleColor[0], 'circle'),
					new Particle(this.position.x, this.position.y, this.normalParticleColor[1], 'circle')
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


		// Dibujado de la pelota por sprite
		System.ctx.drawImage(
			// Sprite.
			this.sprite,

			// Coordenadas.
			(this.position.x - this.radius) * System.scale,
			(this.position.y - this.radius) * System.scale,

			// Ancho y alto.
			this.radius * 2 * System.scale, 
			this.radius * 2 * System.scale
		)
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