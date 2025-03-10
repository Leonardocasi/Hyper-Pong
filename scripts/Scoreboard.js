import * as System from './main.js'
import * as sprites from './Sprites.js'



class Scoreboard {
	constructor(x) {
		this.position = { x, y: 40 }
		this.width = 56
		this.height = 102

		// Valores del Sprite
		this.numSprite = sprites.Numbers

		this.widthNum = this.numSprite.naturalWidth / 11
		this.heightNum = this.numSprite.naturalHeight

		// Marcador
		this.firstDigit = 0
		this.secondDigit = 0
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
	}
}



export { Scoreboard }