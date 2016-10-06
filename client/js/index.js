var canvas = document.getElementById('cdraw');
var ctx = canvas.getContext('2d');

var fg = document.getElementById('cfg');
var fgctx = fg.getContext('2d');

$(document).ready(function(e) {
	fg.width = fg.clientWidth;
	fg.height = fg.clientHeight;
	$('.menu').css({
		'display': 'none'
	});
	while (!App.name) {
		App.name = window.location.search.substr(1) || prompt("username");
		if (App.name == "ADMIN") {
			App.name = "NOT REALLY";
		}

		if (App.name.length > 10) {
			App.name = App.name.substring(0, 10);
		}
	}
	socket.emit('join', {
		name: App.name
	});
});

var socket = io();

var App = {};
var Menu = {};

App.colors = ['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple', 'pink', 'brown', 'white'];

App.brush = {
	sizes: {
		sm: 5,
		md: 10,
		lg: 20
	}
};

App.lineWidth = 5;
App.color = '#000';



//TOOLBOX CONTROLS

$('.shade').on('click touch', function(e) {
	$('.current').css('background', $(e.target).css('background-color'));
	App.color = $(e.target).css('background-color');
});

$('.hue').on('click touch', function(e) {
	$('.hue').removeClass('selected');
	$(e.target).addClass('selected');
	$('.shade').attr('data-color', $(e.target).attr('data-color'));
});

$('.size').on('click touch', function(e) {
	$('.size').removeClass('selected');
	$(e.target).addClass('selected');
	App.lineWidth = App.brush.sizes[$(e.target).attr('data-size')]
});

//CANVAS EVENTS

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
fg.width = canvas.clientWidth;
fg.height = canvas.clientHeight;

$('.editor').on('mousedown', function(e) {
	$('.menu').css({
		'display': 'none'
	});
	App.drawing = true;
	//   ctx.beginPath();
	prev.x = e.pageX;
	prev.y = e.pageY;
	//   ctx.moveTo(e.pageX, e.pageY);
});

$('.editor').on('click', function(e) {
	$('.menu').css({
		'display': 'none'
	});
});

$('.menu--item').on('click', function(e) {
	Menu[$(e.target).attr('data-item')]();
	$('.menu').css({
		'display': 'none'
	});
});

/*$(document).contextmenu(function(e) {
  e.preventDefault();
  showMenu(e.pageX, e.pageY);
});*/

$(document).on('mousemove', function(e) {
	fgctx.fillStyle = App.color;

	fgctx.clearRect(0, 0, fg.width, fg.height);

	fgctx.fillRect(e.pageX - 4.5, e.pageY - 4.5, 10, 10);
	fgctx.strokeRect(e.pageX - 5, e.pageY - 5, 11, 11);
	if ($.now() - lastEmit > 10) {
		socket.emit('mousemove', {
			'x': e.pageX,
			'y': e.pageY,
			'drawing': App.drawing,
			'id': id,
			'width': App.lineWidth,
			'color': App.color,
			'name': App.name
		});
		lastEmit = $.now();
	}




	if (App.drawing) {
		//     drawLine(prev.x, prev.y, e.pageX, e.pageY, App.color, App.lineWidth);
		ctx.beginPath();
		ctx.moveTo(prev.x, prev.y);
		ctx.lineTo(e.pageX, e.pageY);
		ctx.strokeStyle = App.color;
		ctx.lineWidth = App.lineWidth;
		ctx.shadowColor = App.color;
		//     ctx.shadowBlur = App.lineWidth + 10;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.stroke();
		prev.x = e.pageX;
		prev.y = e.pageY;
	}

});

$('.editor').on('mouseup mouseleave', function(e) {
	App.drawing = false;
	//   ctx.lineTo(e.pageX, e.pageY);
	//   ctx.stroke();
});

//WINDOW EVENTS

window.onresize = function(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	fg.width = window.innerWidth;
	fg.height = window.innerHeight;
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	fg.width = canvas.clientWidth;
	fg.height = canvas.clientHeight;
};


//Functions

function drawLine(fromx, fromy, tox, toy, color, width) {
	ctx.beginPath();
	ctx.moveTo(fromx, fromy);
	ctx.lineTo(tox, toy);
	ctx.shadowColor = color;
	// ctx.shadowBlur = 15;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.stroke();
}

function showMenu(x, y) {
	$('.menu').css({
		'display': 'block',
		'left': x + 'px',
		'top': y + 'px'
	})
}

Menu.save = function() {
	window.open(canvas.toDataURL());
}


//VARS

// Generate an unique ID
var id = Math.round($.now() * Math.random());

var clients = {};
var cursors = {};

var prev = {};

var lastEmit = $.now();

$('.chat-field .chat-field--input').keydown(function(e) {
	if (e.which == 13) {
		socket.emit('chat', {
			name: App.name,
			message: $('.chat-field .chat-field--input').val()
		})
		$(e.target).val('');
	}
});

socket.on('chat', function(data) {
	console.info(data.name + ": " + data.message);
	$('.chat-log ul').append($('<li>').text(data.name + ": " + data.message));
});
//SOCKET

socket.on('moving', function(data) {
	if (!(data.id in clients)) {
		// a new user has come online. create a cursor for them
		cursors[data.id] = $('<div class="cursor">').appendTo('.cursors');
	}

	// Move the mouse pointer
	cursors[data.id].css({
		'background': data.color,
		'left': data.x - 4.5,
		'top': data.y - 4.5
	}).attr('data-name', data.name);

	// Is the user drawing?
	if (data.drawing && clients[data.id]) {

		// Draw a line on the canvas. clients[data.id] holds
		// the previous position of this user's mouse pointer

		drawLine(clients[data.id].x, clients[data.id].y, data.x, data.y, data.color, data.width);
	}

	// Saving the current client state
	clients[data.id] = data;
	clients[data.id].updated = $.now();
});
