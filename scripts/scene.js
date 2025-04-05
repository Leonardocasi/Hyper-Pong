import * as System from './main.js'
import { background } from './Sprites.js'



// El ancho de las líneas de la escena.
const density = 4



function draw(menuState) {
	// Dibujado del fondo.
	System.ctx.drawImage(
		// Sprite
		background,

		// Coordenadas.
		0, 0,

		// Ancho y alto
		System.canvas.width,
		System.canvas.height
	)
	console.log(menuState)


	// Color del dibujado del escenario
	if (menuState == 0) {

		System.ctx.fillStyle = "#aaa"


		// Linea superior
		System.ctx.fillRect(
			0, 0,
			System.canvas.width,
			density * System.scale
		)


		// Linea inferior
		System.ctx.fillRect(
			0, System.canvas.height - density * System.scale,
			System.canvas.width,
			density * System.scale
		)


		// Linea central punteada
		for (let i = 0; i < 12 ; i++) {
			System.ctx.fillRect(
				(System.halfWidth - density/2) * System.scale,
				i * (System.unscaledHeight/12) * System.scale,
				density * System.scale,
				(System.unscaledHeight/14) * System.scale
			)
		}
	}
}



export { draw, density }
