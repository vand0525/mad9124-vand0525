'use strict';

const cars = require('./cars.js');
const express = require('express');
const app = express();

app.use(express.json());

const isValidCar = (id, res) => {
	const index = cars.findIndex((car) => car.id === id);
	if (index < 0) {
		res.status(404).json({
			error: `car with id ${id} not found`,
		});
		return null;
	}
	return index;
};

app.get('/api/cars', (req, res) => res.json({ data: cars }));

app.get('/api/cars/:id', (req, res) => {
	const car = cars.find((car) => car.id === parseInt(req.params.id));
	if (!car) {
		res.status(404).json({
			error: `car with id ${req.params.id} not found`,
		});
		return;
	}
	res.json({ data: car });
}); // return the car matching the id value

app.post('/api/cars', (req, res) => {
	// find new car data
	const newCar = {
		id: Date.now(),
		...req.body,
	};

	// save new car in our array
	cars.push(newCar);

	// respond with new car (including its id)
	res.status(201).json({
		message: 'Car created successfully',
		data: newCar,
	});
}); // create a new car

app.put('/api/cars/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = isValidCar(id, res);
	if (index === null) return;

	const updatedCar = { id, ...req.body };
	cars[index] = updatedCar;
	res.json({ data: updatedCar });
}); // replace all properties of a car

app.patch('/api/cars/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = isValidCar(id, res);
	if (index === null) return;

	const { id: _id, ...rest } = req.body;
	const updatedCar = {
		...cars[index],
		...rest,
	};
	cars[index] = updatedCar;
	res.json({ data: updatedCar });
}); // update some properties of a car

app.delete('/api/cars/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = isValidCar(id, res);
	if (index === null) return;

	const [deletedCar] = cars.splice(index, 1);
	res.json({ 
		message: `Car with id ${id} deleted successfully`, 
		data: deletedCar });
}); // destroy the record for a car

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
	if (err) return console.error('An error occured', err);
	console.log(`Server running at ${PORT}`);
});
