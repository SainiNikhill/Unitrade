// server 

import  express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/database.connection.js'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from "./routes/cart.routes.js";


import cors from 'cors'
import orderRouter from './routes/order.routes.js';


connectDB();
connectCloudinary();

const port = process.env.PORT || 5000

// import Routes 
const app = express()
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('api working')
})


// api end points 
app.use('/api/user', userRouter);
app.use('/api/product',  productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})

