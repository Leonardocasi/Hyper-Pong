import * as System from './main.js'



function draw() {
	// Color del dibujado del escenario
	System.ctx.fillStyle = "#aaa"


	// Linea superior
	System.ctx.fillRect(
		0, 0,
		System.canvas.width,
		System.SceneDensity * System.scale
	)


	// Linea inferior
	System.ctx.fillRect(
		0, System.canvas.height - System.SceneDensity * System.scale,
		System.canvas.width,
		System.SceneDensity * System.scale
	)


	// Linea central punteada
	for (let i = 0; i < 12 ; i++) {
		System.ctx.fillRect(
			(System.halfWidth - System.SceneDensity/2) * System.scale,
			i * (System.unscaledHeight/12) * System.scale,
			System.SceneDensity * System.scale,
			(System.unscaledHeight/14) * System.scale
		)
	}
}



export { draw }