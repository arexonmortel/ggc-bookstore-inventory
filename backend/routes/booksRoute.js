
// Import necessary modules
import express from 'express';
import multer from 'multer';
import { Book } from '../models/bookModel.js';

const route = express.Router();

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to save a new book with an image
route.post('/', upload.single('image'), async (req, res) => {
  try {
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publisher: req.body.publisher,
        approvedBy: req.body.approvedBy,
        eduLevel: req.body.eduLevel,
        availability: req.body.availability,
        pubYear: req.body.pubYear,
        isbn: req.body.isbn,
        bookSize: req.body.bookSize,
        pages: req.body.pages,
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      };
      

    const book = await Book.create(newBook);
    console.log(req.body, req.file.buffer, req.file.mimetype, book)
    return res.status(200).send(book);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});


// Route to get all books
route.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        if (!books.length) {
            return res.status(404).json({ message: "No Books Found" });
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


// Route to get one book by ID
route.get('/:id', async(req, res)=>{
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
route.put('/:id', upload.single('image'), async(req, res)=>{

    try{
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publisher: req.body.publisher,
            approvedBy: req.body.approvedBy,
            eduLevel: req.body.eduLevel,
            availability: req.body.availability,
            pubYear: req.body.pubYear,
            isbn: req.body.isbn,
            bookSize: req.body.bookSize,
            pages: req.body.pages,
            image: {
              data: req.file.buffer,
              contentType: req.file.mimetype,
            },
          };
          
            const {id} = req.params;
            const result = await Book.findByIdAndUpdate(id, newBook)
            if(!result){
                return res.status(404).send({message: 'Book not found'})
            }
            return res.status(200).send({message: 'Book updated Successfully'})
    } catch(err){
        console.log(err);
        res.status(500).send({message: err.message})
        console.log(req.body, req.file)
    }
})

// Route to delete a book by ID
route.delete('/:id', async(req, res)=>{
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


// Route to search for books by text
route.get('/search', async (req, res) => {
    try {
        const searchText = req.query.q; // Assuming the search query is passed as 'q' query parameter
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


export default route;