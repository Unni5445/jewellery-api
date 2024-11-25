import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { pageNotFound } from './src/middleware/pageNotFound'
import errorHandler from './src/middleware/errorHandler'
import cookieParser from 'cookie-parser'
import productRouter from './src/routes/product.routes'
import enquiryRouter from './src/routes/enquiry.routes'

dotenv.config()
const app = express()

app.use(helmet());

const allowedOrigins = (process.env.ALLOWED_ORIGINS!).split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);
//new
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("hello guys")
})
app.use('/api/v1',productRouter,enquiryRouter)

mongoose
  .connect(process.env.MONGO_DB!,)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(() => console.log("MongoDB connection failed"));


app.use(pageNotFound)
app.use(errorHandler)
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>console.log(`server run successfully http://localhost:${PORT}`))