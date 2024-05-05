// Import necessary modules
import {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME,
    S3_BUCKET_REGION,
  } from '../config.js';
  import express from 'express';
  import multer from 'multer';
  import { Book } from '../models/bookModel.js';
  import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
  } from '@aws-sdk/client-s3';
  import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
  import { v4 as uuidv4 } from 'uuid';
  import sharp from 'sharp';
  
  const route = express.Router();
  
  const bucketKey = AWS_ACCESS_KEY_ID;
  const bucketSecretKey = AWS_SECRET_ACCESS_KEY;
  const bucketName = S3_BUCKET_NAME;
  const bucketRegion = S3_BUCKET_REGION;
  
  const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
      accessKeyId: bucketKey,
      secretAccessKey: bucketSecretKey,
    },
  });
  
  // Set up Multer for handling file uploads
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  
  // Route to save a new book with an image
  route.post('/', upload.single('image'), async (req, res) => {
    try {
      // Generate a random image name
      const imageName = uuidv4();
      // Resize and convert image to buffer using sharp
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 600, height: 900, fit: 'cover' }) // Size of a book cover
        .toBuffer();
  
      // Upload the buffer to S3
      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype,
      };
  
      const command = new PutObjectCommand(params);
      await s3.send(command);
  
      const getObjectParams = {
        Bucket: bucketName,
        Key: imageName,
      };
      const commandGetUrl = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, commandGetUrl, { expiresIn: 3600 });
  
      // Create a new book object with the image name
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
        image: imageName,
        imageUrl: url,
      };
  
      // Save the new book to MongoDB
      const book = await Book.create(newBook);
  
      return res.status(200).send(book);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });
  
  route.get('/', async (req, res) => {
    try {
      const books = await Book.find({});
      if (!books.length) {
        return res.status(404).json({ message: 'No Books Found' });
      }
  
      // Define an array to store books with image URLs
      const booksWithImageUrl = [];
      for (const book of books) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: book.image,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        booksWithImageUrl.push({
          ...book.toObject(),
          imageUrl: url,
        });
      }
      return res.status(200).json({
        count: booksWithImageUrl.length,
        data: booksWithImageUrl,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: 'Internal Server Error', message: err.message });
    }
  });
  
  // Route to get one book by ID
  route.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      const getObjectParams = {
        Bucket: bucketName,
        Key: book.image,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      const bookWithUrl = {
        ...book.toObject(),
        imageUrl: url,
      };
      return res.status(200).json(bookWithUrl);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  });
  
  // Route to update a book by ID
  route.put('/:id', upload.single('image'), async (req, res) => {
    try {
      const { id } = req.params;
  
      // Retrieve the book by ID from MongoDB
      const book = await Book.findById(id);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      // Resize and convert the uploaded image to a buffer using sharp
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 600, height: 900, fit: 'cover' }) // Size of a book cover
        .toBuffer();
  
      // Upload the buffer to S3
      const params = {
        Bucket: bucketName,
        Key: req.body
          .imageName /* `${id}.${req.file.originalname.split('.').pop()}`, */, // Use a unique filename for the image
        Body: buffer,
        ContentType: req.file.mimetype,
      };
  
      const command = new PutObjectCommand(params);
      await s3.send(command);
  
      // Update book information with the new image URL
      const updatedBook = {
        ...req.body,
        image: req.body.image, // Update other book properties from the request body
        // Set the image property to the S3 object key
      };
  
      // Update the book in MongoDB
      const result = await Book.findByIdAndUpdate(id, updatedBook, { new: true });
  
      if (!result) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      return res
        .status(200)
        .json({ message: 'Book updated successfully', book: result });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  });
  
  // Route to delete a book by ID
  route.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Retrieve the book document from MongoDB using the provided id
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: 'Book Not Found' });
      }
  
      // Delete the associated image from the S3 bucket
      const params = {
        Bucket: bucketName,
        Key: book.image, // Assuming the image property is correctly stored in the book document
      };
      const command = new DeleteObjectCommand(params);
      await s3.send(command);
  
      // Delete the book document from MongoDB
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ message: 'Book Not Found' });
      }
  
      return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
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
          { isbn: { $regex: new RegExp(searchText, 'i') } },
        ],
      });
      if (!books.length) {
        return res.status(404).json({ message: 'No matching Books Found' });
      }
      // Define an array to store books with image URLs
      const booksWithImageUrl = [];
      for (const book of books) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: book.image,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        booksWithImageUrl.push({
          ...book.toObject(),
          imageUrl: url,
        });
      }
      return res.status(200).json({
        count: booksWithImageUrl.length,
        data: booksWithImageUrl,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: 'Internal Server Error', message: err.message });
    }
  });
  
  export default route;
  