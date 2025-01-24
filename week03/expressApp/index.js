'use strict';

const express = require('express');
const cars = require('./cars.js');

console.log(cars);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	response.send('Hello from Express!');
});

app.post('/api/cars', (req, res) => {
	// find new car data
	const newCar = {
		...req.body,
		id: Date.now(),
	};

	// save new car in our array
	cars.push(newCar);

	// respond with new car (including its id)
	res.status(201).json({
		data: newCar,
	});
}); // create a new car

app.get('/api/cars', (req, res) => {
	// express will default to 200
	res.status(200).json({
		data: cars,
	});
}); // return a collection of cars

app.get('/api/cars/:id', (req, res) => {
	const carId = req.params.id;
	const car = cars.find((s) => s.id === parseInt(carId, 10));
	if (!car) {
		res.status(404).json({
			error: `car with id ${carId} not found`,
		});
		return;
	}
	res.json({
		data: cars,
	});
}); // return the car matching the id value

app.patch('/api/cars/:id', (req, res) => {}); // update some properties of a car

app.put('/api/cars/:id', (req, res) => {}); // replace all properties of a car

app.delete('/api/cars/:id', (req, res) => {}); // destroy the record for a car

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
	if (err) return console.error('An error occured', err);
	console.log(`Server running at ${PORT}`);
});
