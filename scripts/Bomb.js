import { Ball } from './Ball.js'



class Bomb extends Ball {
	constructor(position, angle) {
		super(
			position,
			angle
		)
		this.color = "#D31F00"
		this.normalParticleColor = ["#BB2BFF", "#C261FF"]
	}
}



export { Bomb }