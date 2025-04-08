import express from 'express'
import auth from '../middleware/auth.js'
import uploads from '../middleware/multer.js'
import productController from '../controllers/productController.js';
const route = express.Router();

route.post('/addProperty', auth, uploads.single('product_image'), productController.addProduct)
route.get('/allProperty', productController.allProducts)
route.put('/updateProperty/:product_id', auth, uploads.single('product_image'), productController.editProduct)
route.delete('/deleteProperty', auth, productController.deleteProduct)
route.post('/toggleLike', auth,  productController.toggleLike)
route.get('/likedProperty',  productController.getLikedProperties)

export default route;