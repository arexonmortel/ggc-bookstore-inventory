import express from 'express';
import { PORT, MONGO_URL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());

// Route for handling search functionality (defined before other routes)
app.get('/books/search', async (req, res) => {
    try {
        const searchText = req.query.q; // the search query is passed as 'q' query parameter
        const books = await Book.find({
            $or: [
                { title: { $regex: new RegExp(searchText, 'i') } },
                { author: { $regex: new RegExp(searchText, 'i') } },
                { genre: { $regex: new RegExp(searchText, 'i') } },
                { publisher: { $regex: new RegExp(searchText, 'i') } },
                { approvedBy: { $regex: new RegExp(searchText, 'i') } },
                { eduLevel: { $regex: new RegExp(searchText, 'i') } },
                { isbn: { $regex: new RegExp(searchText, 'i') } }
            ]
        });
        if (!books.length) {
            return res.status(404).json({ message: "No matching Books Found" });
        }
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
});

// Route for other book-related operations
app.use('/books', bookRoute);

// Connect to MongoDB
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error: ", err);
    });
