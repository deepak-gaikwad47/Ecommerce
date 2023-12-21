import express from 'express';
import productController from '../controllers/productController.js';
import { isAuthanticatedUser, authorisedRoles } from '../middlewares/auth.js';

const productRoute = express.Router();

productRoute.get('/products', productController.GetAllProduct);
productRoute.get('/product/:id', productController.getProductDetails);
productRoute.post('/admin/products/new', isAuthanticatedUser, authorisedRoles("admin"), productController.createProduct);
productRoute.put('/admin/product/:id', isAuthanticatedUser, authorisedRoles("admin"), productController.editProduct);
productRoute.delete('/admin/product/:id', isAuthanticatedUser, authorisedRoles("admin"), productController.deleteProduct);
productRoute.put('/review', isAuthanticatedUser, productController.createProductReview);
productRoute.get('/reviews', productController.getProductReviews);
productRoute.delete('/reviews', isAuthanticatedUser, productController.deleteProductReview);

export default productRoute;

