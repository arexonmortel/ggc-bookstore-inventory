import React, { useState } from 'react';
import BackButton from '../components/home/BackButton';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function createBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publisher, setPublisher] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [eduLevel, setEduLevel] = useState('');
  const [availability, setAvailability] = useState(''); 
  const [pubYear, setPubYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const [bookSize, setBookSize] = useState('');
  const [pages, setPages] = useState('');
  const [image, setImage] = useState(null);
  
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file);

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('author', author);
      formData.append('genre', genre);
      formData.append('publisher', publisher);
      formData.append('approvedBy', approvedBy);
      formData.append('eduLevel', eduLevel);
      formData.append('availability', availability);
      formData.append('pubYear', pubYear);
      formData.append('isbn', isbn);
      formData.append('bookSize', bookSize);
      formData.append('pages', pages);
      
  
      const response = await axios.post('http://localhost:5555/books', formData);
  
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Error creating book:', error);
      setLoading(false);
      setErrorMessage('Error creating book. Please try again.');
    }
  };
  
  return (
    <div className='p-4'>
      <BackButton />
      {loading ? (<Spinner />): (
        <div className='w-[600px] rounded-xl mx-auto'>
          <h1 className='text-3xl my-3 font-semibold opacity-85'>Create Book</h1>
          <div className='flex flex-col gap-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col justify-center'>
                <label className='text-sm font-medium text-gray-700 mb-2'>Choose Image</label>
                <input
                  type='file'
                  className='p-2 border rounded-md'
                  onChange={handleImageChange}
                  accept='image/*'
                />
              </div>
              <div className='flex flex-col items-center justify-center'>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt='Book Preview'
                    className='mt-2 rounded-md shadow-md max-h-36'
                  />
                )}
              </div>
            </div>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='p-2 border-2 border-gray-200 rounded-lg '
              required
            />
            <input
              type='text'
              placeholder='Author'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='p-2 border-2 border-gray-200 rounded-lg '
              required
            />
            <input
              type='text'
              placeholder='Genre'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className='p-2 border-2 border-gray-200 rounded-lg '
              required
            />
            <input
              type='text'
              placeholder='Publisher'
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className='p-2 border-2 border-gray-200 rounded-lg '
              required
            />
            <input
              type='text'
              placeholder='Approved By'
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              className='p-2 border-2 border-gray-200 rounded-lg '
              required
            />
            <input
              type='text'
              placeholder='Education Level (e.g. Grade 1, Grade 2, etc.)'
              value={eduLevel}
              onChange={(e) => setEduLevel(e.target.value)}
              className='p-2 border-2 border-gray-200 rounded-lg '
              required
            />
            <input
              type='number'
              placeholder='Publication Year'
              value={pubYear}
              onChange={(e) => setPubYear(e.target.value)}
              className='p-2 border-2 border-gray-200 rounded-lg '
              required
              min='1900' // Adjust the minimum year as needed
              max={new Date().getFullYear()} // Set the maximum year to the current year
            />
            <input
              type='text'
              placeholder='ISBN'
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className='p-2 border-2 border-gray-200 rounded-lg '
              required
            />
            <input
              type='text'
              placeholder='Book Size'
              value={bookSize}
              onChange={(e) => setBookSize(e.target.value)}
              className='p-2 border-2 border-gray-200 rounded-lg '
              required
            />
            <input
              type='number'
              placeholder='Pages'
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className='p-2 border-2 border-gray-200 rounded-lg '
              required
            />
            <input
              type='number'
              placeholder='No. of Copies'
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className='p-2 border-2 border-gray-200 rounded-lg '
              required
            />
            <button
              className='bg-primary-txt text-white px-4 py-2 rounded-lg w-1/2 self-center transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:border-primary-txt'
              onClick={handleCreateBook}
            >
              Save Book
            </button>
            {errorMessage && <p className='text-red-400 text-sm'>{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
  
}

export default createBook;
