

function getRandomHexColor() {
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
};

function getRandomNumber(min, max) {
	return Math.floor((Math.random() * max) + min);
};