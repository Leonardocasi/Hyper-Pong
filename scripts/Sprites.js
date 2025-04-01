// Sprite de los números del marcador.
const Numbers = new Image()
Numbers.src = 'sprites/Numbers.png'


const Ball = new Image()
Ball.src = 'sprites/Ball.png'


const Bomb = new Image()
Bomb.src = 'sprites/Bomb.png'


const Power = [ new Image(), new Image() ]
for (let i = 0; i < Power.length; i++) Power[i].src = `sprites/power_${i}.png`



export { Numbers, Ball, Bomb, Power }