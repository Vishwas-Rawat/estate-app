import express from 'express'
import auth from '../middleware/auth.js';
import uploads from '../middleware/multer.js';
import brandController from '../controllers/brandController.js';
const route = express.Router();

route.post('/addBrand', auth, uploads.single('brand_image'), brandController.addBrand);
route.get('/getAllBrands', brandController.getAllBrands);
route.put('/editBrand', auth, uploads.single('brand_image'), brandController.editBrand);
route.delete('/deleteBrand/:brand_id', auth, brandController.deleteBrand);

export default route;