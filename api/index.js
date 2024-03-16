import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
dotenv.config()
const app=express()

mongoose.connect(process.env.MONGO)
.then(
    ()=>{console.log('MongoDb is connected')})
    .catch(
        (err)=>{ console.log(err)}
        )

const PORT=3000
app.listen(PORT,()=>{
    console.log(`Server running on PORT  ${PORT}`)
});
app.use('/api/user', userRoutes);
