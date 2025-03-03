import * as System from './main.js'
import * as Ball from './Ball.js'
import * as scene from './Scene.js'
import * as Players from './Player.js'




// ---- Variables Globales ----
let Balls
let player1 = new Players.Player("left")
let player2 = new Players.Player("right")



// Función de inicialización del juego
// (Solo se ejecuta una vez al inicio y cuando el programa lo solicite de nuevo en un reinicio)
function start() {
	player1.start()
	player2.start()

	Balls = [ new Ball.Ball( System.halfWidth, System.halfHeight ) ]
	Balls[0].start()
}



// Función búcle donde se llevará a cabo toda la lógica del juego.
// (Se ejecuta en cada frame del juego)
function update() {
	// Lógica del juego (dividirlo de esta forma me será util para pausar el juego)
	Balls[0].update()



	// Llamadas de dibujado
	scene.draw()

	player1.draw()
	player2.draw()

	Balls[0].draw()
}



export {start, update}