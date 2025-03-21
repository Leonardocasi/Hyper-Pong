import * as System from './main.js'
import * as sprites from './Sprites.js'



class Scoreboard {
	constructor(x) {
		this.position = { x, y: 40 }
		this.width = 56
		this.height = 102

		this.halfWidth = this.width/2
		this.halfHeight = this.height/2

		// Valores del Sprite
		this.numSprite = sprites.Numbers

		this.widthNum = 0
		this.heightNum = 0

		// Marcador
		this.firstDigit = 0
		this.secondDigit = 0

		// Valores para PowerSlot
		this.power = -1
		this.powerSprite
		this.powerPosition = { x: 0, y: 0}
		this.radius = 40
		this.lineWidth = 6
	}



	// Función de inicialización.
	start() {
		this.widthNum = this.numSprite.naturalWidth / 11
		this.heightNum = this.numSprite.naturalHeight

		if (this.position.x < System.halfWidth) 
			this.powerPosition.x = this.position.x - this.width - this.radius - this.lineWidth*2
		else this.powerPosition.x = this.position.x + this.width + this.radius + this.lineWidth*2
	}



	// Actualización del marcador.
	update(score) {
		this.firstDigit = Math.floor(score / 10)
		this.secondDigit = score % 10
	}



	draw() {
		// Primer Dígito.
		System.ctx.drawImage(
			// Sprite.
			this.numSprite,

			// Dentro del Sprite.
			this.firstDigit * this.widthNum, 0,		// Coordenadas.
			this.widthNum, this.heightNum,			// ancho y alto a abarcar.

			// Dentro del canvas. (estos valores se tienen que adaptar a la escala del juego.)
			(this.position.x - this.width) * System.scale, this.position.y * System.scale,	// Coordenadas.
			this.width * System.scale, this.height * System.scale							// Ancho y alto.
		)

		// Segundo Dígito.
		System.ctx.drawImage(
			// Sprite.
			this.numSprite,

			// Dentro del Sprite.
			this.secondDigit * this.widthNum, 0,	// Coordenadas.
			this.widthNum, this.heightNum,			// ancho y alto a abarcar.

			// Dentro del canvas. (estos valores se tienen que adaptar a la escala del juego.)
			this.position.x * System.scale, this.position.y * System.scale,	// Coordenadas.
			this.width * System.scale, this.height * System.scale							// Ancho y alto.
		)


		// Poder en caso de haber.
		if (this.power != -1)
			System.ctx.drawImage(
				// Sprite.
				this.powerSprite,

				// Coordenadas.
				(this.powerPosition.x - this.radius) * System.scale,
				(this.position.y + this.halfHeight - this.radius) * System.scale,

				// Ancho y alto.
				this.radius*2 * System.scale, this.radius*2 * System.scale
			)

		// Power Slot
		System.ctx.beginPath()
		System.ctx.arc(
			this.powerPosition.x * System.scale,
			(this.position.y + this.halfHeight) * System.scale,
			/*this.radius*/ 40 * System.scale,
			0,		// Angulo de inicio
			6.2832,	// Angulo final (Ambos en radianes)
			false
		)
		System.ctx.strokeStyle = "#888"
		System.ctx.lineWidth = this.lineWidth * System.scale
		System.ctx.stroke()
		System.ctx.closePath()
	}
}



export { Scoreboard }