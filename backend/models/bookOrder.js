import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
    },
    bookGenre: {
      type: String,
      required: true,
    },
    publisher: {
        type: String,
        required: true,
      },
      orderQuantity: {
        type: Number,
        required: true,
      },
    customerName: {
      type: String,
      required: true,
    },
    customerContactNumber: {
      type: Number,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerRegion: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model('Orders', orderSchema);


