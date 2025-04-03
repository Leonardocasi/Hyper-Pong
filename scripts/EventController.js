import * as System from './main.js'
import * as sprites from './Sprites.js'
import * as audio from './audio.js'
import * as scene from './scene.js'
import * as myMath from './myMath.js'
import * as Players from './Player.js'
import { Ball } from './Ball.js'
import { Bomb } from './Bomb.js'
import { Scoreboard } from './Scoreboard.js'




// ---- Variables Globales ----
let Balls = []
let bombs = []
let player1 = new Players.Player("left")
let player2 = new Players.Player("right")

let lastGameState = 0
let GameMode = 0		// 0: Saque de jugador 1, 
						// 1: Saque de jugador 2, 
						// 2: Juego, 
						// 3: Pausa
						// 4: Menú (Valió verga)

let PauseKey = 0

// Esto evita que se active el poder durante un saque.
let controlServe1 = false
let controlServe2 = false

let scoreboard1
let scoreboard2

// variables para el cálculo de colisiones.
let closestX
let closestY

const goals = { player1: 1, player2: 1 }



// Función de inicialización del juego
// (Solo se ejecuta una vez al inicio y cuando el programa lo solicite de nuevo en un reinicio)
function start() {
	Balls = [ new Ball( { x: System.halfWidth, y: System.halfHeight}, 0 ) ]
	Balls.forEach(Ball => {
		Ball.start()
	})

	//console.log(Balls.length)
	
	player1.start()
	player2.start()

	scoreboard1 = new Scoreboard(System.unscaledWidth/6*2)
	scoreboard2 = new Scoreboard(System.unscaledWidth/6*4)

	scoreboard1.start()
	scoreboard2.start()

	// Pruebas
	bombs = [ new Bomb({ x: 100, y: 100 }, 45) ]
	bombs[0].start()
}



// Función búcle donde se llevará a cabo toda la lógica del jusego.
// (Se ejecuta en cada frame del juego)
function update() {
	// Detección de la tecla pausa.
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




	// ----- Lógica del juego (dividirlo de esta forma es útil para pausar el juego) -----
	// Movimiento de los jugadores
	if (GameMode != 3) {
		player1.update(System.Key.Player1Up, System.Key.Player1Down, System.Key.Player1Power)
		player2.update(System.Key.Player2Up, System.Key.Player2Down, System.Key.Player2Power)
	}




	// Funciones de Gameplay que no tienen que ver con la pelota xd
	if (GameMode == 2) {
		// Activación de poderes.
		//	Jugador 1
		if (System.Key.Player1Serve && scoreboard1.power != -1 && !controlServe1) {
			controlServe1 = true
			/*if ( scoreboard1.power == 0 )*/ powerUpMultipleBalls(1)
			scoreboard1.power = -1
		}
				
		//	Jugador 2
		if (System.Key.Player2Serve && scoreboard2.power != -1 && !controlServe2) {
			controlServe2 = true
			powerUpMultipleBalls(2)
			scoreboard2.power = -1
		}
	}




	// Evaluaciones para todas las bolas dentro del juego
	Balls.map((Ball, index) => {
		// Modo Saque del jugador 1
		if (GameMode == 0) {
			Ball.position.x = player1.position.x + Players.width + Ball.radius + 2
			Ball.position.y = player1.position.y + Players.height/2

			if (System.Key.Player1Serve) {
				controlServe1 = true
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
				controlServe2 = true
				Ball.angle = (myMath.random(0,1)) ? myMath.random(135, 170) : myMath.random(190, 225)
				Ball.start()
				if (player2.powerUp) {
					Ball.extraSpeed = true
					Ball.speedCalculation(Ball.velocity + 8)
				} else Ball.extraSpeed = false
				GameMode = 2
			}
		}



		// Actualizaciones durante gameplay
		if (GameMode == 2) {
			// Revisión de colisiones para todas las pelotas del juego.
			// Verificación de colisiones con los jugadores.
			if (playerColition(Ball, player1)) {
				newBallAngle(Ball, player1, closestX, closestY)
				Ball.PlayerColition = true
			}

			if (playerColition(Ball, player2)) {
				newBallAngle(Ball, player2, closestX, closestY)
				Ball.PlayerColition = true
			}
			
			
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
					newBallAngle(Ball, player1, Ball.position.x, Ball.past.y)
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
					newBallAngle(Ball, player2, Ball.position.x, Ball.past.y)
				}
			}


			// Verificación de colisiones con el escenario.
			sceneColition(Ball)



			// Detección de puntos extras. En caso de haber más de una pelota en juego (sigue en proceso)
			if (Balls.length > 1) {
				// Colision lateral derecha (punto del Jugador 1)
				if (Math.floor(Ball.position.x) > System.unscaledWidth + Ball.radius + 200) {
					Balls.splice(index, 1)
				}

				// Colisión lateral izquierda (punto del jugador 2)
				if (Math.floor(Ball.position.x) < -Ball.radius - 200) {
					Balls.splice(index, 1)
				}
			}



			Ball.update()
		}
	})
	

	// Comportamiento de las bombas del PowerUp de las bombas xd.
	bombs.map((Bomb, index) => {
		if (playerColition(Bomb, player1)) {
			if (goals.player1 > 0) {
				goals.player1--
				scoreboard1.update(goals.player1)
			}
			bombs.splice(index, 1)
		}

		if (playerColition(Bomb, player2)) {
			if (goals.player2 > 0) {
				goals.player2--
				scoreboard2.update(goals.player2)
			}
			bombs.splice(index, 1)
		}

		if (GameMode != 3) {
			sceneColition(Bomb)
			Bomb.update()
		}
	})


	// Las siguientes líneas de código solo pueden suceder con una sola pelota en juego.
	if (Balls.length == 1) {
		// Modo Juego
		if (GameMode == 2) {
			// Detección de goles
			// Colision lateral derecha (Gol del Jugador 1)
			if (Math.floor(Balls[0].position.x) > System.unscaledWidth + Balls[0].radius + 30) {
				GameMode = 1						// Reinicio de la pelota
				goals.player1++
				scoreboard1.update(goals.player1)
				Balls[0].particles = []
			}
			
			// Colisión lateral izquierda (Gol del jugador 2)
			if (Math.floor(Balls[0].position.x) < -Balls[0].radius - 30) {
				GameMode = 0						// Reinicio de la pelota
				goals.player2++
				scoreboard2.update(goals.player2)
				Balls[0].particles = []
			}
		}
	}




	// Reestablecimiento del control de las teclas de servicio.
	if (!System.Key.Player1Serve) controlServe1 = false
	if (!System.Key.Player2Serve) controlServe2 = false




	// Llamadas de dibujado
	scene.draw()

	scoreboard1.draw()
	scoreboard2.draw()

	player1.draw()
	player2.draw()

	Balls.forEach(Ball => {
		Ball.draw()
	})

	bombs.map(Bomb => {
		Bomb.draw()
	})
}




// ==========================================================
// ==== Funciones extra para el funcionamiento del juego ====
// ==========================================================




// Función para revisar las colisiones con el escenario
function sceneColition(Ball) {
	// Colisión Superior
	if (Math.round(Ball.position.y) <= Math.round(Ball.radius + scene.density)) {
		Ball.position.y = Ball.radius + scene.density
		Ball.speed.y *= -1
		Ball.getNewAngle()
		audio.play(audio.sceneHit)
	}

	// Colisión inferior
	if (Math.round(System.unscaledHeight - Ball.position.y) <= Math.round(Ball.radius + scene.density)) {
		Ball.position.y = System.unscaledHeight - Ball.radius - scene.density
		Ball.speed.y *= -1
		Ball.getNewAngle()
		audio.play(audio.sceneHit)
	}
}



// Función para la detección de colisiones de las pelotas con los jugadores.
function playerColition(Ball, player) {
	closestX = Math.max(player.position.x, Math.min(Ball.position.x, player.position.x + Players.width))
	closestY = Math.max(player.position.y, Math.min(Ball.position.y, player.position.y + Players.height))
	
	let distanceX = Ball.position.x - closestX
	let distanceY = Ball.position.y - closestY
	
	let distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

	return distance <= Ball.radius
}



// Función para realizar los cambios necesarios en caso de que se produzca una colisión con un jugador.
function newBallAngle(Ball, player, closestX, closestY) {
	audio.play(audio.paddleHit)

	// Aumento de velocidad por colisión.
	Ball.velocity++

	// Aumento de carga del jugador.
	if (player.charge < player.maxCharge && !player.powerUp) player.charge += 60


	let hitY = closestY - player.position.y
	let zone = Math.round(hitY/(Players.height/5))
	//console.log(zone)

	let NewAngleRight = [315, 333, 350, 10, 27, 45]
	let NewAngleLeft = [225, 208, 190, 170, 152, 135]

	let NewAngle = 0

	// Establecimiento del nuevo ángulo en base a la zona de colisión en el jugador.
	if (closestX > player.position.x + Players.width/2)
		NewAngle = NewAngleRight[zone]
	else if (closestX < player.position.x + Players.width/2)
		NewAngle = NewAngleLeft[zone]

	// Establecimiento del nuevo ángulo con un añadido aleatorio para evitar búcles infinitos.
	Ball.angle = NewAngle + myMath.random(-5, 5)
	Ball.extraSpeed = player.powerUp ? true : false
	Ball.speedCalculation( player.powerUp ? Ball.velocity + 8 : Ball.velocity )
}



// Función para el poder de las multiples pelotas.
function powerUpMultipleBalls(player) {
	// Esto me ayudará a seleccionar una bola aleatoria en caso de ya haber varias.
	let BallIndex = myMath.random(0, Balls.length -1)
	let Length = Balls.length

	for (let i = 0; i < 10; i++) {
		Balls.push( 
			new Ball(
				// Coordenadas.
				{ x: Balls[BallIndex].position.x, y: Balls[BallIndex].position.y }, 
				
				// Ángulos.
				player == 1
				? (myMath.random(0,100) <= 50) ? myMath.random(10, 45) : myMath.random(315, 350)
				: (myMath.random(0,100) <= 50) ? myMath.random(135, 170) : myMath.random(190, 225)
			)
		)
		Balls[Length + i].start()
	}
}



// Función para el poder de la bola bomba.
function powerUpBombBall(player) {
	
}



// Función para asignar un poder a un jugador.
function newPower(player) {
	let power = myMath.random(0, 1)

	switch(player) {
		case 1:
			scoreboard1.power = power
			scoreboard1.powerSprite = sprites.Power[power]
			break
		case 2:
			scoreboard2.power = power
			scoreboard2.powerSprite = sprites.Power[power]
			break
	}
}



export {
	// Funciones
	start,
	update,
	newPower,


	// Cosas que no son funciones xD
	Balls,
	goals
}