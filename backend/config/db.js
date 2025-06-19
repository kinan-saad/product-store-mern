// external connection
import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1) // process 1 code means failure, 0 means success
  }
}

// // local connection
// import mongoose from 'mongoose'

// // mongodb://localhost:27017

// const uri = 'mongodb://127.0.0.1:27017/mern-project-1'

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(uri)
//     console.log('DB is running...')
//   } catch (error) {
//     console.log('Error: ', error)
//   }
// }
