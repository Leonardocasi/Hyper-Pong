// Sprite de los números del marcador.
const Numbers = new Image()
Numbers.src = 'sprites/Numbers.png'


const Power = [ new Image() ]
for (let i = 0; i < Power.length; i++) Power[i].src = `sprites/power_${i}.png`



export { Numbers, Power }