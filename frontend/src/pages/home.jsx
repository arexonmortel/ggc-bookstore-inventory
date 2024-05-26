import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchInput from '../components/home/SearchInput';
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard'; 
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [error, setError] = useState(false);
  const [booksFound, setBooksFound] = useState(true); // State to track if books were found

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5555/books');
      setBooks(response.data.data);
      console.log(response.data.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  };

  const handleSearch = async (searchResults) => {
    setBooks(searchResults.data)
    console.log("search results", searchResults.data)
  };


  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4 mb-14'>
        <Tooltip title="Table View">
        <button
          className='bg-primary-txt text-white px-4 py-1 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-primary-txt hover:ring-inset hover:ring-1 hover:ring-primary-txt'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        </Tooltip>
        <Tooltip title="Card View">
        <button
          className='bg-primary-txt text-white px-4 py-1 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-primary-txt hover:ring-inset hover:ring-1 hover:ring-primary-txt'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
        </Tooltip>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-3 font-semibold opacity-85'>Books List</h1>
        <div className='flex items-center justify-center gap-6'>
        <SearchInput onSearch={handleSearch} onBooksFound={setBooksFound} />
        <Link to='/books/create'>
          <Tooltip title= "Add Book" placement="top">
            <IconButton>
          <MdOutlineAddBox className="text-primary-txt text-custom-size" />
          </IconButton>
          </Tooltip>
        </Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : !booksFound ? ( // Render message if no books were found
      <div className='mt-6'>
        <h1 className='opacity-80'>No Books Found...</h1>
      </div>
    )
       : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
