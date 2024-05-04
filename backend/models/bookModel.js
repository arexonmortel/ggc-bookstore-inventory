import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    approvedBy: {
      type: String,
      required: true,
    },
    eduLevel: {
      type: String,
      required: true,
    },
    availability: {
      type: Number,
      required: true,
    },
    pubYear: {
      type: Number,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    bookSize: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    image: {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);


export const Book = mongoose.model('BookCollection', bookSchema);
