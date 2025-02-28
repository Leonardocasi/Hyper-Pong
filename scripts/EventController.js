import * as System from './main.js'
import * as Ball from './Ball.js'
import * as scene from './Scene.js'




// ---- Variables Globales ----
let Balls




function start() {
	Balls = [ new Ball.Ball( 100, 100 ) ]
	Balls[0].start()
}




function update() {
	scene.drawScene()

	Balls[0].update()
	Balls[0].draw()
}




export {start, update}