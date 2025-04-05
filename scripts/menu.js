import * as System from './main.js'
import { title } from './Sprites.js'
import { density } from './scene.js'



function draw(buttons) {
	// Imágen de la portada.
	System.ctx.drawImage(
		// Sprite.
		title,

		// Coordenadas.
		System.canvas.width / 2 - title.naturalWidth/4 * System.scale,
		System.canvas.height / 4 - title.naturalHeight/4 * System.scale,

		// Tamaño (alto y ancho).
		title.naturalWidth/2 * System.scale, title.naturalHeight/2 * System.scale
	)


	// Dibujados de los botones.
	buttons.map(button => {
		button.draw()
	})


	// Copyrigth.
	System.ctx.save()

	System.ctx.fillStyle = "#FFFFFF"
	System.ctx.font = `${20 * System.scale}px plus jakarta sans`

	System.ctx.fillText(
		// Texto.
		"© Leonardocasi 2025",
 
		// Posición
		0,
		System.canvas.height - density * System.scale
	)

	System.ctx.restore()
}



// Clase para los botones del menú xd.
class Button {
	constructor(x, text) {
		this.position = { x, y: 0 }
		this.text = text

		this.width = 250
		this.height = 74

		this.color = "#00FFFF"
		this.textColor = "#FFFFFF"
	}



	start(index, y) {
		// Inicialización de la posición y.
		this.position.y = y

		// Ajuste al centro.
		this.position.x -= this.width /2
		this.position.y -= this.height /2
		
		// Acomodo de la posición dependiendo del número de botón.
		this.position.y += index * (this.height + 30)
	}



	update(selection) {
		if (selection) {
			this.color = "#CF29E5"
			this.textColor = "#FFD800"
		} else {
			this.color = "#00FFFF"
			this.textColor = "#FFFFFF"
		}
	}



	draw () {
		System.ctx.save()
		// Color del borde del botón.
		System.ctx.strokeStyle = this.color
		System.ctx.lineWidth = 4 * System.scale

		// Efecto del brillo.
		System.ctx.shadowColor = this.color
		System.ctx.shadowBlur = 20 * System.scale

		// Dibujo del botón
		System.ctx.beginPath()
		// Función personalizada para bordes redondeados
		System.ctx.roundRect(
			// Coordenadas.
			this.position.x * System.scale,
			this.position.y * System.scale,

			// Tamaño.
			this.width * System.scale,
			this.height * System.scale,
			
			// Redondeo de los bordes.
			15 * System.scale
		) 
		System.ctx.stroke()

		// Para el relleno del botón
		System.ctx.fillStyle = `${this.color}40`
		System.ctx.fill()



		// Dibujo del texto del botón.
		// Efecto del brillo.
		System.ctx.shadowColor = this.textColor
		System.ctx.shadowBlur = 20 * System.scale

		System.ctx.fillStyle = this.textColor
		System.ctx.font = `${28 * System.scale}px plus jakarta sans`
		System.ctx.textAlign = "center"
		System.ctx.textBaseline = "middle"
		System.ctx.fillText(
			// Texto.
			this.text,

			// Posición.
			(this.position.x + this.width / 2) * System.scale,
			(this.position.y + this.height / 2) * System.scale 
		)

		System.ctx.restore()
	}
}



export { draw, Button }