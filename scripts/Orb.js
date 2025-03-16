import * as System from './main.js'
import * as myMath from './myMath.js'



// Objeto Orbe de poder.
class Orb {
	constructor(fate) {
		this.position = { x: System.halfWidth, y: myMath.random(30, System.unscaledHeight - 30) }
		this.fate = fate
		this.radius = 10
		this.speed = 0
	}



	update() {
		if (this.fate < System.halfWidth) {
			this.speed -= 0.01 * System.DeltaTime
		} else {
			this.speed += 0.01 * System.DeltaTime
		}

		this.position.x += this.speed * System.DeltaTime
	}



	draw() {
		// Dibujo del orbe
		System.ctx.beginPath()
		System.ctx.arc(
			this.position.x * System.scale,
			this.position.y * System.scale,
			this.radius * System.scale,
			0,		// Angulo de inicio
			6.2832,	// Angulo final (Ambos en radianes)
			false
		)
		System.ctx.fillStyle = "#5f5"
		System.ctx.fill()
		System.ctx.closePath()
	}
}



export { Orb }