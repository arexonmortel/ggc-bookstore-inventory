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
        genre: {
            type: String,
            required: true
        },
        publisher: {
            type: String,
            required: true
        },
        approvedBy: {
            type: String,
            required: true
        },
        eduLevel: {
            type: String,
            required: true
        },
        isAvailable: {
            type: Boolean,
            required: true
        },
        pubYear:{
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)
export const Book = mongoose.model('BookCollection', bookSchema);