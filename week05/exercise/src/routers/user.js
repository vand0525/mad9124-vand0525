const { Router } = require('express');

const userController = require('../controllers/user')
const { validateUserData } = require('../middleware/validateUserData');
const userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.post('/', validateUserData, userController.create);

module.exports = userRouter;