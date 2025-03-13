import * as System from './main.js'
import * as myMath from './myMath.js'



class Particle {
	constructor(x, y, color, shape) {
		this.position = { x, y }
		this.speed = { x: myMath.random(-25, 25)/10, y: myMath.random(-25, 25)/10 }

		this.opacity = 1
		this.color = color || '#ffffff'
		this.shape = shape
		this.radius = myMath.random(4, 10)
	}



	update() {
		this.position.x += this.speed.x * System.DeltaTime
		this.position.y += this.speed.y * System.DeltaTime
		this.opacity -= 0.04 * System.DeltaTime
	}



	draw() {
		System.ctx.save()
		System.ctx.globalAlpha = this.opacity
		System.ctx.fillStyle = this.opacity <= 0 ? 'transparent' : this.color
		System.ctx.beginPath()
		System.ctx.arc(this.position.x * System.scale, this.position.y * System.scale, this.radius, 0, 6.2832)
		System.ctx.fill()
		System.ctx.closePath()
		System.ctx.restore()
	}
}



export { Particle }