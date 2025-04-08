import express from 'express'
import categoryController from '../controllers/categoryController.js';
import uploads from "../middleware/multer.js"
import auth from '../middleware/auth.js'
const route = express.Router();
route.post('/addCategory', auth, uploads.single('category_image'), categoryController.addCategory);
route.get('/allCategories', categoryController.getAllCategories);
route.put('/updateCategory/:category_id', auth, uploads.single('category_image'), categoryController.updateCategory);
route.delete('/deleteCategory', auth, categoryController.deleteCategory);

export default route;