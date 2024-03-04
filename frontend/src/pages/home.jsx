import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard'; 


const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    
    <div className='p-4 '>
      <div className='flex justify-center items-center gap-x-4'>
      <button
      className='bg-primary-txt text-white px-4 py-1 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-primary-txt hover:ring-inset hover:ring-1 hover:ring-primary-txt'
      onClick={() => setShowType('table')}
    >
      Table
    </button>
        <button
      className='bg-primary-txt text-white px-4 py-1 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-primary-txt hover:ring-inset hover:ring-1 hover:ring-primary-txt'
      onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-3 font-semibold opacity-85'>Books List</h1>
        <Link to='/books/create'>
      <MdOutlineAddBox className="text-primary-txt text-custom-size transition-transform transform hover:scale-110" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;