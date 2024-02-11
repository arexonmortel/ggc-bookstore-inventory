import express from 'express';
import {PORT, MONGO_URL} from './config.js';
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';

const app = express();

// Middeware for parsing request body
app.use(express.json());

// create http route 
app.get('/', (req, res)=>{
    console.log(req);
    return res.status(200).send('Hello World')
})

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

// Route to save a new book
app.post('/books', async(req, res)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.pubYear
        ){
            return res.status(400).send({message: 'All fields are required'})
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            pubYear: req.body.pubYear
        }
        const book = await Book.create(newBook)
        return res.status(200).send(book)
    } catch(err){
        console.log(err)
        res.status(500).send({message: err.message})
    }
})

// Route to get all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        if(!books.length){
            return res.status(404).json({message: "No Books Found"})
        }
        return res.status(200).json({
            count: books.length,
            data: books
        }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
});


// Route to get one book by ID
app.get('/books/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book)

    } catch(err){
        console.log(err);
        res.status(500).send({message: err.message})
    }
})

// Route to update a book by ID
app.put('/books/:id', async(req, res)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.pubYear
        ){
            return res.status(400).send({message: 'All fields are required'})
        }
            const {id} = req.params;
            const result = await Book.findByIdAndUpdate(id, req.body)
            if(!result){
                return res.status(404).semd({message: 'Book not found'})
            }
            return res.status(200).send({message: 'Book updated Successfully'})
    } catch(err){
        console.log(err);
        res.status(500).send({message: err.message})
    }
})

// Route to delete a book by ID
app.delete('/books/:id', async(req, res)=>{
    try{
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id)
        if(!result){
            return res.status(404).json({message: "Book Not Found"})
        }
        return res.status(200).json({message: "Book deleted successfully"})

    } catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

