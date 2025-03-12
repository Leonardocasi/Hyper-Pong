import * as System from './main.js'
import * as Scene from './Scene.js'
import * as myMath from './myMath.js'
import {Balls} from './EventController.js'



// Variables para el jugador.
const width = 20
const height = 100



class Player {
	constructor(side) {
		this.side = side
		this.position = {x: 0, y: 0 }

		this.speed = 10
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
		if (Up && this.position.y > Scene.density)		
			this.position.y -= this.speed * System.DeltaTime
		else if (this.position.y < Scene.density)
			this.position.y = Scene.density

		if (Down && this.position.y + height < System.unscaledHeight - Scene.density)	
			this.position.y += this.speed * System.DeltaTime
		else if (this.position.y + height > System.unscaledHeight - Scene.density)
			this.position.y = System.unscaledHeight - Scene.density - height

		Balls.forEach(Ball => {
			// Evaluación de colisión en el momento.
			this.ballColition(Ball, Ball.position.x, Ball.position.y)
			// Evaluación de colisión en el siguiente Frame. (En caso de Stutter).
			this.ballColition(Ball, Ball.position.x + Ball.speed.x * System.DeltaTime, Ball.position.y + Ball.speed.y * System.DeltaTime)
		})
	}



	// Detección de colición con la pelota.
	ballColition(Ball, BallPosX, BallPosY) {
		let closestX = Math.max(this.position.x, Math.min(BallPosX, this.position.x + width))
		let closestY = Math.max(this.position.y, Math.min(BallPosY, this.position.y + height))

		let distanceX = BallPosX - closestX
		let distanceY = BallPosY - closestY

		let distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

		if (distance <= Ball.radius) {
			this.newAngle(Ball, closestX, closestY)
		}
	}



	// Cambio de ángulo de la pelota.
	newAngle(Ball, closestX, closestY) {
		//Ball.speed.x *= -1

		let hitY = closestY - this.position.y
		let zone = Math.round(hitY/(height/5))
		//console.log(zone)

		let NewAngleRight = [315, 333, 350, 10, 27, 45]
		let NewAngleLeft = [225, 208, 190, 170, 152, 135]

		let NewAngle = 0

		// Establecimiento del nuevo ángulo en base a la zona de colisión en el jugador.
		if (closestX > this.position.x + width/2)
			NewAngle = NewAngleRight[zone]
		else if (closestX < this.position.x + width/2)
			NewAngle = NewAngleLeft[zone]

		// Establecimiento del nuevo ángulo con un añadido aleatorio para evitar búcles infinitos.
		Ball.angle = NewAngle + myMath.random(-5, 5)
		Ball.speedCalculation()
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



export { Player, width, height }