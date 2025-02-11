const userService = require('../services/users');

const create = (req, res, next) => {
	try {
        const newUser = userService.create(req.body);

		res.status(201).json({
			data: newUser,
		});
	} catch (err) {
		next(err);
	}
};

const getAll = (req, res, next) => {
	try {
        const users = userService.getAll(req.body);

		res.status(200).json({
			data: users,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	create,
	getAll,
};
