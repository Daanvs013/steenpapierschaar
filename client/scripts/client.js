var sock = io();

var updateEventDiv = (text) => {
	var eventList = document.getElementById('events');
	var newEvent = document.createElement('div');
	newEvent.innerHTML = text;
	eventList.appendChild(newEvent);
};

var addButtonListeners = () => {
	['steen','papier','schaar'].forEach((id) => {
		var button = document.getElementById(id);
		button.addEventListener('click', () => {
			sock.emit('turn', id);
		});
	});
};

var onFormSubmit = (e) => {
	e.preventDefault();
	var input = document.getElementById('chat-text');
	var text = input.value;
	input.value = '';
	sock.emit('message', text);
};

updateEventDiv("Welkom op deze prachtige website!")
sock.on('message', updateEventDiv);
document.getElementById('chat-form').addEventListener('submit', onFormSubmit);
addButtonListeners();