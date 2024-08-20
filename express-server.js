import express from 'express';
const server = express();
import teachersRouter from './routes/teacher.js';
import studentRouter from './routes/student.js';
import MongooseconnectDB from './db.utils/Mongoose.js';
import connectDB from './db.utils/Mongo.js';
import cors from 'cors';

server.use(express.json());
server.use(cors());
await connectDB();
await MongooseconnectDB();
//Endpoint Routes
server.use('/students',studentRouter);
server.use('/teachers',teachersRouter);


const port = 8000;
server.listen(port, ()=>{
    console.log(Date().toString(),`Server is running on port ${port}`);
});