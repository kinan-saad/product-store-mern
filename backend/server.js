// const express = require('express')
import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './config/db.js'
import productsRouter from './routes/product.route.js'
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json()) // Allows us to accept JSON data in the req.body

app.use('/api/products', productsRouter)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/dist')))
}

app.listen(PORT, () => {
  connectDB()
  console.log('Server started at http://localhost:' + PORT)
})
