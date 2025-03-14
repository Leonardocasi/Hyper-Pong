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

	


	// Lógica del juego (dividirlo de esta forma es útil para pausar el juego)
	// Movimiento de los jugadores
	if (GameMode != 3) {
		player1.update(System.Key.Player1Up, System.Key.Player1Down, System.Key.Player1Power)
		player2.update(System.Key.Player2Up, System.Key.Player2Down, System.Key.Player2Power)
	}
	
	
	
	// Evaluaciones para todas las bolas dentro del juego
	// (la mayoría solo funcionarán en caso de solo haber una xD)
	Balls.forEach(Ball => {
		// Modo Saque del jugador 1
		if (GameMode == 0) {
			Ball.position.x = player1.position.x + Players.width + Ball.radius + 2
			Ball.position.y = player1.position.y + Players.height/2

			if (System.Key.Player1Serve) {
				Ball.angle = (myMath.random(0,1)) ? myMath.random(10, 45) : myMath.random(315, 350)
				Ball.start()
				if (player1.powerUp) {
					Ball.extraSpeed = true
					Ball.speedCalculation(Ball.velocity + 8)
				} else Ball.extraSpeed = false
				GameMode = 2
			}
		}


		// Modo saque del jugador 2
		if (GameMode == 1) {
			Ball.position.x = player2.position.x - Ball.radius - 2
			Ball.position.y = player2.position.y + Players.height/2

			if (System.Key.Player2Serve) {
				Ball.angle = (myMath.random(0,1)) ? myMath.random(135, 170) : myMath.random(190, 225)
				Ball.start()
				if (player2.powerUp) {
					Ball.extraSpeed = true
					Ball.speedCalculation(Ball.velocity + 8)
				} else Ball.extraSpeed = false
				GameMode = 2
			}
		}
		


		// Modo Juego
		if (GameMode == 2) {
			// Verificación de colisiones.
			player1.ballColition(Ball, Ball.position.x, Ball.position.y)
			player2.ballColition(Ball, Ball.position.x, Ball.position.y)
			
			// Verificación de bola fantasma. (Errores en la detección de colisiones debido a Stuttering)
			// Jugador 1
			if (Ball.position.x - Ball.radius <= player1.position.x + Players.width && !Ball.PlayerColition) {
				if (// Evaluaciones en X
					Ball.past.x + Ball.radius >= player1.position.x &&
					Ball.position.x - Ball.radius <= player1.position.x + Players.width &&
					// Evaluaciones en Y (Solo se evalua si está dentro del rango la posicion actual de la bola)
					Ball.past.y >= player1.position.y && 
					Ball.past.y <= player1.position.y + Players.height
				) {
					Ball.position.x = player1.position.x + Players.width + Ball.radius
					player1.newAngle(Ball, Ball.position.x, Ball.past.y)
				}
			}
			
			
			// Jugador 2
			if (Ball.position.x + Ball.radius >= player2.position.x && !Ball.PlayerColition) {
				if (// Evaluaciones en X
					Ball.position.x + Ball.radius >= player2.position.x &&
					Ball.past.x - Ball.radius <= player2.position.x + Players.width &&
					// Evaluaciones en Y (Solo se evalua si está dentro del rango la posicion actual de la bola)
					Ball.past.y >= player2.position.y && 
					Ball.past.y <= player2.position.y + Players.height
				) {
					Ball.position.x = player2.position.x - Ball.radius
					player2.newAngle(Ball, Ball.position.x, Ball.past.y)
				}
			}
			
			
			
			// Detección de goles
			// Colision lateral derecha (Gol del Jugador 1)
			if (Math.floor(Ball.position.x) > System.unscaledWidth + Ball.radius + 30) {
				GameMode = 1						// Reinicio de la pelota
				goalsPlayer1++
				scoreboard1.update(goalsPlayer1)
				Ball.particles = []
			}
			
			// Colisión lateral izquierda (Gol del jugador 2)
			if (Math.floor(Ball.position.x) < -Ball.radius - 30) {
				GameMode = 0						// Reinicio de la pelota
				goalsPlayer2++
				scoreboard2.update(goalsPlayer2)
				Ball.particles = []
			}



			Ball.update()
		}
	})




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