var canvas = document.querySelector('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// Listens for a window resize, then fills the width again
	window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
// calls init() to regenerate circles in the whole new canvas
	init();
});

function Circle(x, y) {
	this.x = x;
	this.y = y;
	this.growing = true;
	this.radius = (Math.random()+0.1)*30;
	this.growSpeed = Math.random()/30;
	this.maxSize = (Math.random()+0.3)*60;
	
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, Math.PI*2, false)
		c.strokeStyle = "#888";
		c.stroke();
	}
	
	this.update = function() {
		if (this.radius > this.maxSize) {
			this.growing = false;
		}
		if (this.radius < 1) {
			this.growing = true;
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.growSpeed = Math.random()/30;
			this.maxSize = (Math.random()+0.3)*60;
		}
		if (this.growing == false) {
			this.radius = this.radius - this.growSpeed;
		} else {
			this.radius = this.radius + this.growSpeed;
		}
	
		this.draw();
	
	}
}
	
var growingArray = [];

function init() {
	
	growingArray = [];

	for (var i = 0; i < canvas.width/8; i++) {
		var x = Math.random() * canvas.width;
		var y = Math.random() * canvas.height;
		
		growingArray.push(new Circle(x, y));
	}
}
	
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
			
	for (var i = 0; i < growingArray.length; i++) {
		growingArray[i].update();
	}
}

init();
animate();
