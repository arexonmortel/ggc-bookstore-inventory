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
import Select from 'react-select';


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
      //console.log(response.data.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  };
  const optionsView = [
    { value: 'table', label: 'Table View' },
    { value: 'card', label: 'Card View' }
  ];
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '2px solid #e2e8f0',
      borderRadius: '0.375rem',
      text: 'rgb(107 114 128 / var(--tw-placeholder-opacity))',
      boxShadow: state.isFocused ? '0 0 0 1px rgba(25, 24, 71, 0.2)' : 'none',
      '&:hover': {
        borderColor: 'rgba(25, 24, 71, 0.2)',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#191847' : 'white',
      color: state.isSelected ? 'white' : '#4a5568',
      '&:hover': {
        backgroundColor: 'rgba(25, 24, 71, 0.2)',
        color: '#191847',
      },
    }),
  };

  const handleSearch = async (searchResults) => {
    setBooks(searchResults.data)
    //console.log("search results", searchResults.data)
  };


  return (
    <div className='p-4'>
      {/* <div className='flex justify-center items-center gap-x-4 mb-14'>
        <Tooltip title="Table View" arrow>
        <button
          className='bg-primary-txt text-white px-4 py-1 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-primary-txt hover:ring-inset hover:ring-1 hover:ring-primary-txt'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        </Tooltip>
        <Tooltip title="Card View" arrow>
        <button
          className='bg-primary-txt text-white px-4 py-1 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-primary-txt hover:ring-inset hover:ring-1 hover:ring-primary-txt'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
        </Tooltip>
      </div> */}
      {/* <h1 className='text-6xl my-3 p-6 font-bold opacity-85 text-center'>GGC Inventory</h1> */}
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-3 font-semibold opacity-85'>Books List</h1>
        <div className='flex items-center justify-center gap-6'>
        <div className='flex justify-center items-center gap-1'>
        <p className="text-primary-txt text-opacity-95">Select View:</p>
          <Select
            className="rounded-lg p-2 py-3 outline-none"
            options={optionsView}
            onChange={(e) => setShowType(e.value)}
            styles={customStyles}
            placeholder="Table View"
          />
        </div>
        <SearchInput onSearch={handleSearch} onBooksFound={setBooksFound} />
        <Link to='/books/create'>
          <Tooltip title= "Add Book" placement="top" arrow>
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
