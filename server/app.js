import express from 'express'
import authRoutes from "./routes/authRoutes.js"
import errorMiddleware from './middleware/errorHandler.js'


const app = express()

app.use(express.json())

app.get('/', (req,res)=>{
    res.send("QorZen API is running")
})

app.use("/api/auth", authRoutes)

app.use(errorMiddleware)

export default app;