import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        author: {
            type: String,
            required: true
        },
        pubYear:{
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)
export const Book = mongoose.model('BookCollection', bookSchema);