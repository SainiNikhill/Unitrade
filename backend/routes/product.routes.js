
import express  from 'express'
import { addProduct,removeProduct,getAllProducts,viewProduct ,} from '../controllers/productController.js'

import upload from '../middleware/multer.js'

import authMiddleware from '../middleware/auth.js'

const productRouter = express.Router();

productRouter.post(
  "/add-product",
  authMiddleware,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
   
  ]) , addProduct
);
productRouter.get('/', getAllProducts)
productRouter.delete('/remove', authMiddleware, removeProduct)
productRouter.get('/view/:productId', viewProduct);


export default productRouter;
