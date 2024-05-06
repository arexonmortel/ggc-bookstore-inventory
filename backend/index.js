import express from 'express';
import { PORT, MONGO_URL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import bookRoute from './routes/booksRoute.js';
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
