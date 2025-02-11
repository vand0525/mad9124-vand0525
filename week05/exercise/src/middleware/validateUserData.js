const {BadRequestError} = require('./errors');

const validateUserData = (req, _res, next) => {
	try {
		const validKeys = ['name', 'email'];
		for (key of validKeys) {
			if (!req.body[key]) throw new BadRequestError('name and email are required fields');
		}
		next();
	} catch (err) {
        next(err);
    }
};

module.exports = {
	validateUserData,
};
