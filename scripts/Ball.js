import * as System from './main.js'

class Ball {
	constructor(x, y) {
		this.position = { x, y }
		this.speed = { x: 0, y: 0 }

		this.size = 24
	}

	draw() {
		System.ctx.fillStyle = "#fff"
		System.ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
	}
}

export { Ball }