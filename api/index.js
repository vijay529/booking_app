import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoute from './routes/auth.js';
import authHotels from './routes/hotels.js';
import authRooms from './routes/rooms.js';
import authUser from './routes/users.js';

const app = express();
dotenv.config();

const connect = async()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to database');
} catch (error) {
    throw error;
}
};

mongoose.connection.on("disconnected", ()=>{
    console.log('disconnected from database');
})

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", authUser);
app.use("/api/hotels", authHotels);
app.use("/api/rooms", authRooms);

//error handler
app.use((err, req, res, next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong";
    return res.status(errStatus).json({
        success:false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    });
})

app.listen(8000, ()=>{
    connect()
    console.log('connected to port 8000');
})