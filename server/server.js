//sock.emit verstuurd een package alleen naar een client.
//io.emit verstuurd een package naar alle clients.

var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var SpsGame = require('./sps-game.js');
var app = express();
var clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
var server = http.createServer(app);
var io = socketio(server);

var waitingPlayer = null;

server.on('error',(err) => {
	console.error("Server fout: ", err);
});

server.listen(8080, () => {
	console.log("Server gestart op poort 8080.");
});

io.on('connection', (sock) => {
	console.log("Client verbonden met de server.")
	sock.emit('message', '[Status]: Verbonden met de server.');

	if (waitingPlayer) {
		//start de game, want er is iemand aan het wachten.
		new SpsGame(waitingPlayer,sock);
		waitingPlayer = null;
	} else {
		waitingPlayer = sock;
		waitingPlayer.emit('message','[Status]: Aan het wachten op een tweede speler...');
	}

	sock.on('message', (text) => {
		io.emit('message', "-" + text);
	});

});
