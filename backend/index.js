import express from 'express';
import { PORT, MONGO_URL } from './config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Order } from './models/bookOrder.js';
import { Book } from './models/bookModel.js';
import bookRoute from './routes/booksRoute.js';
import { User }from './models/user.js'
import cors from 'cors';


// Import necessary modules
import {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME,
    S3_BUCKET_REGION,
  } from './config.js';
  import {
    S3Client,
    GetObjectCommand,
  } from '@aws-sdk/client-s3';
  import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

  
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


const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());



// Route for handling search functionality (defined before other routes)
app.get('/books/search', async (req, res) => {
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

// Admin registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username is not available');
    }

    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send('Error registering user');
  }
});

// Admin login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id, username: user.username }, 'SECRET_KEY');
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
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


    // Send Email
    app.post('/book-inquire', async (req, res) => {
      try {
        const { bookTitle, bookGenre, publisher, name, contactNumber, email, region, orderQuantity, message } = req.body;
        const newOrder = {
          bookTitle: bookTitle,
          bookGenre: bookGenre,
          publisher: publisher,
          customerName: name,
          customerContactNumber: contactNumber,
          customerEmail: email,
          customerRegion: region,
          orderQuantity: orderQuantity,
          message: message,
        };
        const order = await Order.create(newOrder);

        return res.status(200).send(order);
        res.status(200).json({ message: 'Order sent successfully' });
      } catch (error) {
        console.error('Error sending Order:', error);
        res.status(500).json({ error: 'An error occurred while sending the book Inquiry' });
      }
    });

    app.get('/book-inquire', async(req, res)=>{

      try {
        const orders = await Order.find({});
        if (!orders.length) {
          return res.status(404).json({ message: 'No Orders Found' });
        }
        return res.status(200).json({
          count: orders.length,
          data: orders,
        });

      } catch {
        console.error('Error sending Order:', error);
        res.status(500).json({ error: 'An error occurred while sending the book Inquiry' });
      }

    })
    
   