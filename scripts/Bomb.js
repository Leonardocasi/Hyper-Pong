import { Ball } from './Ball.js'
import * as sprites from './Sprites.js'



// Clase extensión de Ball para el poder de la bola bomba. (Creo que es obvio, pero igual lo comento)
class Bomb extends Ball {
	constructor(position, angle) {
		super(
			position,
			angle
		)
		this.sprite = sprites.Bomb
		this.color = "#D31F00"
		this.normalParticleColor = ["#BB2BFF", "#C261FF"]
	}
}



export { Bomb }