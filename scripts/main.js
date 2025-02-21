import * as EventController from './EventController.js'

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = 1280
canvas.height = 720

const perfectFrames = 1000/60
let DeltaTime = 0
let lastTimeStamp = 0

function main() {
	requestAnimationFrame(EventController.update)
}

export { main, canvas, ctx, DeltaTime }