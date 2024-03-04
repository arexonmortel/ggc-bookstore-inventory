import express from 'express';
import {PORT, MONGO_URL} from './config.js';
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Using middleware
app.use(cors())
// Option 2: Using CORS package
/* app.use(
    cors({
        origin: 'http://localhost:5555',
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
) */

// create http route 
app.get('/', (req, res)=>{
    console.log(req);
    return res.status(200).send('Hello World')
})

app.use('/books', bookRoute);

// Connect to MongoDB
mongoose
.connect(MONGO_URL)
.then(()=>{
console.log('Connected to MongoDB');
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
})
.catch((err)=>{
    console.log("Error: ", err);
})


