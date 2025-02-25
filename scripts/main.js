import * as EventController from './EventController.js'




const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let lastWidth = innerWidth
let lastHeight = innerHeight

const scaledWidth = 1280
const scaledHeight = 720

let widthLower = false
let scale = 1

const perfectFrames = 1000/60
let DeltaTime = 0
let lastTimeStamp = 0




function main() {
	newRes()

	EventController.start()
	requestAnimationFrame(mainLoop)
}

function mainLoop(timeStamp) {
	requestAnimationFrame(mainLoop)
	DeltaTime = (timeStamp - lastTimeStamp) / perfectFrames
	lastTimeStamp = timeStamp

	if (innerWidth != lastWidth || innerHeight != lastHeight) {
		newRes()

		lastWidth = innerWidth
		lastHeight = innerHeight
	}

	ctx.clearRect(0,0, canvas.width, canvas.height)

	EventController.update()
}




function newRes() {
	canvas.width = innerWidth
	canvas.height = canvas.width * 9 / 16
	 
	if (canvas.height > innerHeight) {
		canvas.height = innerHeight
		canvas.width = canvas.height * 16 / 9
	}
	
	scale = canvas.height / 720
}




export { main, canvas, ctx, DeltaTime, scale, scaledWidth, scaledHeight }