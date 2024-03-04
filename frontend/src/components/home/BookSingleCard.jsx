import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete, MdOutlineVerified } from 'react-icons/md';
import { useState } from 'react';
import { PiBooks } from "react-icons/pi";
import { IoMdBusiness } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";

import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-primary-txt rounded-lg'>
        <p className='text-white'>{book.pubYear}</p>
      </h2>
      <h4 className='my-2 text-primary-txt opacity-75 text-sm'>{book._id}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-primary-txt text-2xl' />
        <h2 className='my-1'>{book.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-primary-txt text-2xl' />
        <h2 className='my-1'>{book.author}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBooks  className='text-primary-txt text-2xl' />
        <h2 className='my-1'>{book.genre}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <IoMdBusiness className='text-primary-txt text-2xl' />
        <h2 className='my-1'>{book.publisher}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <MdOutlineVerified  className='text-primary-txt text-2xl' />
        <h2 className='my-1'>{book.approvedBy}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <PiStudent className='text-primary-txt text-2xl' />
        <h2 className='my-1'>{book.eduLevel}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <GoDotFill className={book.isAvailable? 'text-green-400': 'text-red-400'} />
        <h2 className='my-1'>{book.isAvailable? "In stock" : "Out of stock"}</h2>
      </div>


      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-primary-txt hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;