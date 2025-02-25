import * as System from './main.js'
import * as Ball from './Ball.js'

// ---- Variables Globales ----
let Balls

function start() {
	Balls = [ new Ball.Ball( 100, 100 ) ]
}

function update() {
	console.log(System.DeltaTime)
	Balls[0].draw()
}

export {start, update}