
class SpsGame{

	constructor(p1, p2) {
		this.players = [p1, p2];
		this.turns = [null,null];

		this.sendToPlayers('[Status]: Tegenstander gevonden, game gaat beginnen...')
		this.players.forEach((player, idx) => {
			player.on('turn', (turn) => {
				this.onTurn(idx, turn);
			});
		});
	}

	sendToPlayers(msg) {
		this.players.forEach((player) => {
			player.emit('message', msg);
		});
	}

	sendToPlayer(playerIndex, msg){
		this.players[playerIndex].emit('message', msg);
	}

	onTurn(playerIndex, turn) {
		this.turns[playerIndex] = turn;
		this.sendToPlayer(playerIndex, `*Je koos ${turn}*`);

		this.checkGameOver();
	}

	checkGameOver() {
		var turns = this.turns;
		if (turns[0] && turns[1]) {
			this.sendToPlayers('*Game Over! ' + turns.join(' vs ') + '*');
			this.getGameResults();
			this.turns = [null,null];
			this.sendToPlayers('[Status]: Volgende ronde gaat beginnen.');
		}
	}

	getGameResults() {
		switch (this.turns[0]) {
			case 'steen':
				switch (this.turns[1]) {
					case 'steen': this.sendToPlayers('*Gelijkspel!');
						return;
					case 'papier': this.sendToPlayers('*Papier heeft gewonnen!*');
						return;
					case 'schaar': this.sendToPlayers('*Steen heeft gewonnen!*');
						return;
				}
			case 'papier':
				switch (this.turns[1]) {
					case 'steen': this.sendToPlayers('*Papier heeft gewonnen!*');
						return;
					case 'papier': this.sendToPlayers('*Gelijkspel!*');
						return;
					case 'schaar': this.sendToPlayers('*Schaar heeft gewonnen!*');
						return;
				}
			case 'schaar':
				switch (this.turns[1]) {
					case 'steen': this.sendToPlayers('*Steen heeft gewonnen!*');
						return;
					case 'papier': this.sendToPlayers('*Schaar heeft gewonnen!*');
						return;
					case 'schaar': this.sendToPlayers('*Gelijkspel!*');
						return;
				}
		}
	}
}

module.exports = SpsGame;