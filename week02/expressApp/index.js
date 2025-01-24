'use strict';

const express = require('express');
const cars = require('./cars.js');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello from Express!');
});

app.get('/api', (req, res) => {
	res.send({
		data: {
			message: 'Hello from Express!',
		},
	});
});

app.get('/api/cars', (req, res) => {
	res.send({ data: cars });
}); // return a collection of cars

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
	if (err) return console.error('An error occured', err);
	console.log(`Server running at ${PORT}`);
});
