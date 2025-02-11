'use strict';

const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routers/user');
const {errorHandler} = require('./middleware/errors');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (_req, res) => {
	res.send('Server Running..');
});

app.use('/api/user', userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
