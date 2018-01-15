
var canvas = document.querySelector('canvas'); //set a variable 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight/10;
var c = canvas.getContext('2d');

var circlesDivision = 600; // This is the amount of that we divide the size of the canvas by
var pixelDistance = 60; // This is how close the circles need to get to the mouse.

var minRadius = 4;
var maxRadius = 40;
var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('load', function(event) {
	canvasPos = canvas.getBoundingClientRect();
	canvasTop = canvasPos.y;
})

window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
	// console.log(mouse); // check it's working!
})

// Listens for a window resize, then fills the width again
	window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight/10;
	
// calls init() to regenerate circles in the whole new canvas
	init();
});

// Object function name has a capital letter (shows it is an object)

function Circle(x, y, dx, dy, radius, hex) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.hex = hex;
	
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		c.strokeStyle = hex;
		c.stroke();
		c.fill();
	}
	
	this.update = function() {
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
		this.dx = -this.dx;
		}
	
		if (this.y + this.radius > (canvas.height) || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
	
		this.x += this.dx;
		this.y += this.dy;
		
		// interactivity
		if (mouse.x - this.x < pixelDistance && mouse.x - this.x > -pixelDistance
		&& mouse.y - (this.y + canvasTop) < pixelDistance && mouse.y - (this.y + canvasTop) > -pixelDistance && this.radius < maxRadius
		) {
			this.radius +=1;
		} else if (this.radius > minRadius) {
			this.radius -=1;
		}
		
		this.draw();
	}
}

// define array
var circleArray = [];

function init() {
	//clear array before starting
	circleArray = [];
	// Tell us how many circles you made...
	console.log(canvas.height*canvas.width/circlesDivision); 
	
	for (var i = 0; i < canvas.height*canvas.width/circlesDivision; i++) {
		var x = Math.random() * (canvas.width - radius * 2);
		var y = Math.random() * (canvas.height - radius * 2);
		var dx = (Math.random() - 0.5); // -0.5 gives us the possibility of negative values as Math.random() gives 0 to 1
		var dy = (Math.random() - 0.5);
		var radius = 10;
			
		var hex = "#FF3333";
		
		circleArray.push(new Circle(x, y, dx, dy, radius, hex));
	}
}

function animate() {
	requestAnimationFrame(animate); // loops by calling the animate function over and over
	c.clearRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

init();
animate();







