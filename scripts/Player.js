import * as System from './main.js'
import * as scene from './scene.js'
import * as EventController from './EventController.js'
import * as myMath from './myMath.js'
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
		this.charge = 0
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

		// Renicio de los orbes de poder en caso de ser necesario.
		Orbs = []
	}



	// Función de actualización del jugador.
	update(Up, Down, Power) {
		if (Up && this.position.y > scene.density)		
			this.position.y -= this.speed * System.DeltaTime

		if (Down && this.position.y + height < System.unscaledHeight - scene.density)	
			this.position.y += this.speed * System.DeltaTime
		

		// Control para que no se pase del escenario.
		if (this.position.y < scene.density) this.position.y = scene.density
		if (this.position.y + height > System.unscaledHeight - scene.density) this.position.y = System.unscaledHeight - scene.density - height


		this.power(Power)
	}



	power(Power) {
		// Activación del poder básico
		if (Power && this.charge >= this.maxCharge && !this.powerUp) {
			this.basicPower()
		}


		// Revocamiento de poder básico
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
				EventController.newPower(this.side == "left" ? 1 : 2)
			}

			if (Orb.position.x + Orb.radius >= System.unscaledWidth + 30 ||
				Orb.position.x - Orb.radius <= -30
			) {
				Orbs.splice(index, 1)
			}
		})
	}



	// Función del activación del poder
	basicPower() {
		this.powerUp = true
		this.speed += 4
		Orbs.push(new Orb(this.position.x))
	}



	// Función de dibujado para el jugador.
	draw() {
		// Dibujo del orbe de poder.
		Orbs.map(Orb => {
			Orb.draw()
		})



		// Punto de control del ctx.
		System.ctx.save()

		// Base del jugador.
		// Brillo del contorno.
		System.ctx.shadowColor= "#fff"
		System.ctx.shadowBlur = 8 * System.scale

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
		// Brilo del contorno.
		if (!this.powerUp) System.ctx.shadowColor= this.charge >= this.maxCharge ? "#FFD800" : "#FF6A00"
		else System.ctx.shadowColor = "#00FFFF"
		System.ctx.shadowBlur = 5 * System.scale

		if (!this.powerUp) System.ctx.fillStyle = this.charge >= this.maxCharge ? "#FFD800" : "#FF6A00"
		else System.ctx.fillStyle = "#00FFFF"
		System.ctx.fillRect(
			(this.position.x + this.chargeMargin) * System.scale,
			(this.position.y + this.chargeMargin + height - 2 * this.chargeMargin - this.charge * this.chargeSection) * System.scale,
			(width - 2 * this.chargeMargin) * System.scale,
			(this.charge * this.chargeSection) * System.scale
		)

		// Restablecimiento del punto de control.
		System.ctx.restore()
	}
}




// Clase Bot que proviene del jugador. Esta objeto será el jugador automático... creo que es obvio xd.
class Bot extends Player {
	constructor(side) {
		super(side)

		this.colitionTarget = -1
		this.miss = -1

		this.out = -1
	}

	updateBot(Balls, serve, player, powerUp) {
		// Inicialización en caso de ser necesaria.
		if (this.colitionTarget <= 0) {
			this.colitionTarget = myMath.random(0, height)

			// Aprovechando el hecho de que esto activa a cada golpe. Puedo poner aquí lo de los poderes.
			if (this.charge >= this.maxCharge && !this.powerUp) {
				if (myMath.random(0, 100) >= 50) this.basicPower()
			}

			if (powerUp >= 0) {
				if (myMath.random(0, 100) >= 50) EventController.powerUpActivation(player)
			}
		}

		if (this.miss < 0) {
			this.miss = myMath.random(0, 100) <= 90 ? 0 : 1

			if (this.miss == 1) {
				this.colitionTarget = height + Balls[0].radius + 5
			}
		}

		if (this.out < 0) {
			this.out = myMath.random(Balls[0].radius * 3, System.unscaledHeight - Balls[0].radius * 3)
		}



		// Movimiento durante el saque.
		if (serve) {
			if (this.colitionTarget >= 0) {
				this.colitionTarget = -1
			}
	
			if (this.miss <= 0) {
				this.miss = -1
			}



			if (this.position.y + height /2 < this.out) {
				this.position.y += this.speed * System.DeltaTime
			}
			else if (this.position.y + height /2 > this.out) {
				this.position.y -= this.speed * System.DeltaTime
			}

			if (this.position.y + height /2 <= this.out + 50 &&
				this.position.y + height /2 >= this.out - 50
			) {
				this.out = -1
				EventController.serve(Balls[0], player)
			}
		}

		else {
			// Movimiento durante el juego.
			if (Balls[0].position.x >= System.unscaledWidth/2 && this.side == "right")
				this.gameMove(Balls)
			else if (this.side == "right")
				if (Orbs.length > 0) this.gameMove(Orbs)

			
			if (Balls[0].position.x <= System.unscaledWidth/2 && this.side == "left")
				this.gameMove(Balls)
			else if (this.side == "left")
				if (Orbs.length > 0) this.gameMove(Orbs)

		}
	}

	gameMove(Balls) {
		if (this.position.y + this.colitionTarget < Balls[0].position.y - 20) {
			this.position.y += this.speed * System.DeltaTime
		}
		else if (this.position.y + this.colitionTarget > Balls[0].position.y + 20) {
			this.position.y -= this.speed * System.DeltaTime
		}
	}
}





export { Player, Bot, width, height }