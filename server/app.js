import express from 'express'

const app = express()

app.get('/', (req,res)=>{
    res.send("QorZen API is running")
})

export default app;