import * as System from './main.js'
import * as Ball from './Ball.js'
import * as scene from './Scene.js'
import * as Player from './Player.js'




// ---- Variables Globales ----
let Balls
let player1 = new Player.Player(Player.width * 2, 0, 0 )



// Función de inicialización del juego
// (Solo se ejecuta una vez al inicio y cuando el programa lo solicite de nuevo en un reinicio)
function start() {
	player1.start()

	Balls = [ new Ball.Ball( 100, 100 ) ]
	Balls[0].start()
}



// Función búcle donde se llevará a cabo toda la lógica del juego.
// (Se ejecuta en cada frame del juego)
function update() {
	scene.draw()

	player1.draw()

	Balls[0].update()
	Balls[0].draw()
}



export {start, update}