import express from 'express'
import userController from '../controllers/userController.js';
import auth from '../middleware/auth.js';
const route = express.Router();
route.post('/register', userController.register);
route.post('/login', userController.login);
route.get('/getUserInfo', auth, userController.getUserInfo)
// Add this new route
route.get('/likes/:product_id', userController.getLikesByProperty);

export default route;