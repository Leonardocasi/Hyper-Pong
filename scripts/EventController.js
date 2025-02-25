import * as System from './main.js'
import * as Ball from './Ball.js'




// ---- Variables Globales ----
let Balls




function start() {
	Balls = [ new Ball.Ball( 100, 100 ) ]
}




function update() {
	Balls[0].update()
	Balls[0].draw()
}




export {start, update}