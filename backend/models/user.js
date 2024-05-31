import mongoose from 'mongoose';

// Define MongoDB schema for users
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true },
});

export const User = mongoose.model('User', userSchema);

