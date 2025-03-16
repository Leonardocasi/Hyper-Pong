import * as System from './main.js'
import * as Scene from './Scene.js'
import * as myMath from './myMath.js'
import * as EventController from './EventController.js'
import { Orb } from './Orb.js'



// Variables para el jugador.
const width = 24
const height = 100
let Orbs = []



class Player {
	constructor(side) {
		this.side = side
		this.position = {x: 0, y: 0 }

		this.speed = 12

		// Variables de poderes.
		this.chargeMargin = 4
		this.charge = 1800
		this.maxCharge = 1800
		this.powerUp = false

		this.chargeSection = (height - 2*this.chargeMargin)/this.maxCharge
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
	update(Up, Down, Power) {
		if (Up && this.position.y > Scene.density)		
			this.position.y -= this.speed * System.DeltaTime
		else if (this.position.y < Scene.density)
			this.position.y = Scene.density

		if (Down && this.position.y + height < System.unscaledHeight - Scene.density)	
			this.position.y += this.speed * System.DeltaTime
		else if (this.position.y + height > System.unscaledHeight - Scene.density)
			this.position.y = System.unscaledHeight - Scene.density - height


		// Activación del poder
		if (Power && this.charge >= this.maxCharge && !this.powerUp) {
			this.powerUp = true
			this.speed += 4
			Orbs.push(new Orb(this.position.x))
		}


		// Revocamiento de poder
		if (this.powerUp)	this.charge -= System.DeltaTime
		if (this.powerUp && this.charge <= 0) {
			this.charge = 0
			this.powerUp = false
			this.speed -= 4
		}


		// Orbe de poder.
		Orbs.map((Orb, index) => {
			Orb.update()


			// Revisión de colisión con Orbe
			if (Orb.position.x + Orb.radius >= this.position.x &&
				Orb.position.x - Orb.radius <= this.position.x + width &&
				Orb.position.y - Orb.radius <= this.position.y + height &&
				Orb.position.y + Orb.radius >= this.position.y) {
				Orbs.splice(index, 1)
				EventController.newBalls()

			}
		})
	}



	// Detección de colición con la pelota.
	ballColition(Ball, BallPosX, BallPosY) {
		let closestX = Math.max(this.position.x, Math.min(BallPosX, this.position.x + width))
		let closestY = Math.max(this.position.y, Math.min(BallPosY, this.position.y + height))

		let distanceX = BallPosX - closestX
		let distanceY = BallPosY - closestY

		let distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)


		// Corrección de trayectoria en caso de colisión.
		if (distance <= Ball.radius) {
			this.newAngle(Ball, closestX, closestY)
			Ball.PlayerColition = true
		}
	}



	// Cambio de ángulo de la pelota.
	newAngle(Ball, closestX, closestY) {
		// Aumento de velocidad por colisión.
		Ball.velocity++

		// Aumento de carga del jugador.
		if (this.charge < this.maxCharge && !this.powerUp) this.charge += 60


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
		Ball.extraSpeed = this.powerUp ? true : false
		Ball.speedCalculation( this.powerUp ? Ball.velocity + 8 : Ball.velocity )
	}



	// Función de dibujado para el jugador.
	draw() {
		// Dibujo del orbe de poder.
		Orbs.map(Orb => {
			Orb.draw()
		})



		// Base del jugador.
		System.ctx.fillStyle = "#fff"
		System.ctx.fillRect(
			this.position.x * System.scale,
			this.position.y * System.scale,
			width * System.scale,
			height * System.scale
		)


		// Contenedor de carga.
		System.ctx.fillStyle = "#101010"
		System.ctx.fillRect(
			(this.position.x + this.chargeMargin) * System.scale,
			(this.position.y + this.chargeMargin) * System.scale,
			(width - 2 * this.chargeMargin) * System.scale,
			(height - 2 * this.chargeMargin) * System.scale
		)


		// Nivel de carga.
		if (!this.powerUp) System.ctx.fillStyle = this.charge >= this.maxCharge ? "#FFD800" : "#FF6A00"
		else System.ctx.fillStyle = "#00FFFF"
		System.ctx.fillRect(
			(this.position.x + this.chargeMargin) * System.scale,
			(this.position.y + this.chargeMargin + height - 2 * this.chargeMargin - this.charge * this.chargeSection) * System.scale,
			(width - 2 * this.chargeMargin) * System.scale,
			(this.charge * this.chargeSection) * System.scale
		)
	}
}



export { Player, width, height }