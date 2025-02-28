import * as System from './main.js'
import * as Ball from './Ball.js'
import * as scene from './Scene.js'
import * as Player from './Player.js'




// ---- Variables Globales ----
let Balls
let player1 = new Player.Player(Player.width * 2, 0, 0 )



function start() {
	player1.start()

	Balls = [ new Ball.Ball( 100, 100 ) ]
	Balls[0].start()
}




function update() {
	scene.drawScene()

	player1.draw()

	Balls[0].update()
	Balls[0].draw()
}




export {start, update}