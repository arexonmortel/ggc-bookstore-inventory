
import express from 'express';
import {Book} from '../models/bookModel.js';
 
const route = express.Router();-

// Route to save a new book
route.post('/', async (req, res) => {
    try {
        /* if (
            !req.body.title ||
            !req.body.author ||
            !req.body.genre ||
            !req.body.publisher ||
            !req.body.approvedBy ||
            !req.body.eduLevel ||
            !req.body.isAvailable ||
            !req.body.pubYear
        ) {
            return res.status(400).send({ message: 'All fields are required' });
        }
 */
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publisher: req.body.publisher,
            approvedBy: req.body.approvedBy,
            eduLevel: req.body.eduLevel,
            isAvailable: req.body.isAvailable, 
            pubYear: req.body.pubYear,
        };

        const book = await Book.create(newBook);
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
route.put('/:id', async(req, res)=>{
    try{
        /* if(
            !req.body.title||
            !req.body.author||
            !req.body.pubYear||
            !req.body.genre||
            !req.body.publisher||
            !req.body.approvedBy||
            !req.body.eduLevel||
            !req.body.isAvailable
        ){
            return res.status(400).send({message: 'All fields are required'})
        } */
            const {id} = req.params;
            const result = await Book.findByIdAndUpdate(id, req.body)
            if(!result){
                return res.status(404).send({message: 'Book not found'})
            }
            return res.status(200).send({message: 'Book updated Successfully'})
    } catch(err){
        console.log(err);
        res.status(500).send({message: err.message})
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

export default route;