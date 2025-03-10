// Conversiones de metricas
function degToRad(Deg) {
	let Rad = Deg * Math.PI / 180
	return Rad
}

function radtoDeg(Rad) {
	let Deg = Rad * 180 / Math.PI
	return Deg
}



// Funciones trigonométricas que trabajan en grados
function degSin(Deg) {
	let out = Math.sin(degToRad(Deg))
	
	return out
}

function degCos(Deg) {
	let out = Math.cos(degToRad(Deg))
	
	return out
}

function degAtan(x, y) {
	let out = redondeo(radtoDeg(Math.atan2(y, x)), 2)
	return (out < 0) ? out + 360 : out
}



// Función de redondeo
function redondeo(numero, decimales) {
	let pot = 10 ** decimales
	let respuesta = Math.round( numero * pot ) / pot

	return respuesta
}



// Número aleatorio en un determinado rango.
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}



export { degSin, degCos, degAtan, redondeo, random }