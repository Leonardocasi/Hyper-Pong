import * as System from './main.js'
import * as Ball from './Ball.js'
import * as scene from './Scene.js'
import * as Players from './Player.js'
import * as myMath from './myMath.js'
import { Scoreboard } from './Scoreboard.js'




// ---- Variables Globales ----
let Balls
let player1 = new Players.Player("left")
let player2 = new Players.Player("right")

let lastGameState = 0
let GameMode = 0		// 0: Saque de jugador 1, 
						// 1: Saque de jugador 2, 
						// 2: Juego, 
						// 3: Pausa

let PauseKey = 0

let scoreboard1
let scoreboard2

let goalsPlayer1 = 0
let goalsPlayer2 = 0



// Función de inicialización del juego
// (Solo se ejecuta una vez al inicio y cuando el programa lo solicite de nuevo en un reinicio)
function start() {
	Balls = [ new Ball.Ball( System.halfWidth, System.halfHeight, 0 )/*, new Ball.Ball( System.halfWidth, System.halfHeight, 70 )*/ ]
	Balls.forEach(Ball => {
		Ball.start()
	})

	//console.log(Balls.length)
	
	player1.start()
	player2.start()

	scoreboard1 = new Scoreboard(System.unscaledWidth/4)
	scoreboard2 = new Scoreboard(System.unscaledWidth/4*3)

	window.onload = function() {
		scoreboard1.start()
		scoreboard2.start()
	}
}



// Función búcle donde se llevará a cabo toda la lógica del jusego.
// (Se ejecuta en cada frame del juego)
function update() {
	// Detección de la pausa.
	if ((System.Key.Esc || System.Key.Enter) && !PauseKey) {
		PauseKey = 1

		if (GameMode != 3) {
			lastGameState = GameMode
			GameMode = 3
		}
		else GameMode = lastGameState
	}

	if (!System.Key.Enter && !System.Key.Esc) {
		PauseKey = 0
	}
	



	// Lógica del juego (dividirlo de esta forma me será util para pausar el juego)
	Balls.forEach(Ball => {
		// Modo Saque del jugador 1
		if (GameMode == 0) {
			Balls.forEach(Ball => {
				Ball.position.x = player1.position.x + Players.width + Ball.radius
				Ball.position.y = player1.position.y + Players.height/2

				if (System.Key.Player1Serve) {
					GameMode = 2
					Ball.angle = myMath.random(45, 315)
				}
			})
		}


		// Modo saque del jugador 2
		if (GameMode == 1) {
			Balls.forEach(Ball => {
				Ball.position.x = player2.position.x - Ball.radius
				Ball.position.y = player2.position.y + Players.height/2

				if (System.Key.Player2Serve) {
					GameMode = 2
					Ball.angle = myMath.random(135, 225)
				}
			})
		}
		


		// Modo Juego
		if (GameMode == 2) {
			// Detección de goles
			// Colision lateral derecha (Gol del Jugador 1)
			if (Math.round(System.unscaledWidth - Ball.position.x) < -Ball.radius) {
				goalsPlayer1++
				scoreboard1.update(goalsPlayer1)
				GameMode = 1						// Reinicio de la pelota
			}

			// Colisión lateral izquierda
			if (Math.round(Ball.position.x) < -Ball.radius) {
				goalsPlayer2++
				scoreboard2.update(goalsPlayer2)
				GameMode = 0						// Reinicio de la pelota
			}

			Ball.update()
		}
	})


	// Movimiento de los jugadores
	if (GameMode != 3) {
		player1.update(System.Key.Player1Up, System.Key.Player1Down)
		player2.update(System.Key.Player2Up, System.Key.Player2Down)
	}



	// Llamadas de dibujado
	scene.draw()

	scoreboard1.draw()
	scoreboard2.draw()

	player1.draw()
	player2.draw()

	Balls.forEach(Ball => {
		Ball.draw()
	})
}



export { start, update, Balls, goalsPlayer1, goalsPlayer2 }