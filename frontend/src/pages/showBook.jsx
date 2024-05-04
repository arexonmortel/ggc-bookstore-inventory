import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../components/spinner'
import BackButton from '../components/home/BackButton'
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineVerified, MdCalendarMonth, MdOutlineUpdate  } from 'react-icons/md';
import { PiBooks } from "react-icons/pi";
import { IoMdBusiness, IoMdCreate } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { LuBookKey } from "react-icons/lu";
import { MdOutlinePages } from "react-icons/md";
import { LuBookLock } from "react-icons/lu";
import { TbBookUpload } from "react-icons/tb";
import { RiPagesLine } from "react-icons/ri";



function showBook() {

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingImage, setLoadingImage] = useState(true);

    const handleImageLoaded = () => {
      setLoadingImage(false);
    };
  
    const { id } = useParams();
  
    useEffect(() => {
      try {
        setLoading(true);
        axios
          .get(`http://localhost:5555/books/${id}` )
          .then((res) => {
            setBook(res.data)
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    }, [id]);
  

  return (
  <div className='p-4'>
    <BackButton />
    {
      loading ? (<Spinner/>) : (
    <div className="text-inherit border border-primary-txt rounded-lg shadow-md max-w-md mx-auto p-6 bg-white ">
   <div className="relative">
      <img
        src={book.imageUrl}
        alt={book.tittle}
        className={`rounded-lg max-w-60 h-64 mx-auto object-contain mb-4 ${
          loading ? 'hidden' : 'block'
        }`}
        onLoad={handleImageLoaded}
      />
    </div>
  <div className="mb-4 ">
     <p className="text-xl font-semibold">{book.title}</p>
      </div>
  <div className="mb-2 flex flex-row justify-between">
    <div className='flex flex-row items-center gap-1'>
    < LuBookLock className='text-primary-txt text-xl opacity-75' />
    <p className="font-extralight opacity-75">id</p>
    </div>
    <p className=" font-medium text-primary-txt opacity-75">{book._id}</p>
  </div>

  <div className="mb-2 flex flex-row justify-between">
    <div className='flex flex-row items-center gap-1'>
    <BiUserCircle className='text-primary-txt text-xl opacity-75' />
    <p className="font-extralight opacity-75">Author</p>
    </div>
    <p className=" font-medium text-primary-txt opacity-95 max-w-56 text-right">{book.author}</p>
  </div>

  <div className="mb-2 flex flex-row justify-between">
    <div className='flex flex-row items-center gap-1'>
    <PiBooks  className='text-primary-txt' />
    <p className="font-light opacity-75">Genre</p>
    </div>
    <p className=" font-medium text-primary-txt opacity-95">{book.genre}</p>
  </div>

  <div className="mb-2 flex flex-row justify-between">
    <div className='flex flex-row items-center gap-1'>
    <IoMdBusiness className='text-primary-txt' />
    <p className="font-light opacity-75">Publisher</p>
    </div>
    <p className=" font-medium text-primary-txt opacity-95">{book.publisher}</p>
  </div>

  <div className="mb-2 flex flex-row justify-between">  
  <div className='flex flex-row items-center gap-1'>
    <MdOutlineVerified className='text-primary-txt' />
    <p className="font-light opacity-75">Approved By</p>
    </div>
    <p className=" font-medium text-primary-txt opacity-95">{book.approvedBy}</p>
  </div>

  <div className="mb-2 flex flex-row justify-between">
  <div className='flex flex-row items-center gap-1'>
    <PiStudent className='text-primary-txt' />
    <p className="font-light opacity-75">Educational Level</p>
    </div>
    <p className=" font-medium text-primary-txt opacity-95 w-1/2 text-right">{book.eduLevel}</p>
  </div>

  <div className="mb-2 flex flex-row justify-between">
  <div className='flex flex-row items-center gap-1'>
  <GoDotFill className={book.availability ? 'text-green-400': 'text-red-400'} />
    <p className="font-light opacity-75">No. of Copies</p>
    </div>
    <p className={`text-lg font-medium opacity-95 ${book.availability ? 'text-green-400' : 'text-red-400'}`}>
    {new Intl.NumberFormat().format(book.availability)}
    </p>
  </div>

  <div className="mb-2 flex flex-row justify-between">
  <div className='flex flex-row items-center gap-1'>
    <MdCalendarMonth className='text-primary-txt' />
    <p className="font-light opacity-75">Publication Year</p>
    </div>
    <p className=" font-semibold text-primary-txt opacity-95">{book.pubYear}</p>
  </div>
  
  <div className="mb-2 flex flex-row justify-between">
          <div className='flex flex-row items-center gap-1'>
            <LuBookKey className='text-primary-txt text-xl opacity-75' />
            <p className="font-extralight opacity-75">ISBN</p>
          </div>
          <p className=" font-medium text-primary-txt opacity-75">{book.isbn}</p>
        </div>
        <div className="mb-2 flex flex-row justify-between">
          <div className='flex flex-row items-center gap-1'>
            <TbBookUpload className='text-primary-txt text-xl opacity-75' />
            <p className="font-extralight opacity-75">Book Size</p>
          </div>
          <p className=" font-medium text-primary-txt opacity-75">{book.bookSize}</p>
        </div>
        <div className="mb-2 flex flex-row justify-between">
          <div className='flex flex-row items-center gap-1'>
            <RiPagesLine className='text-primary-txt text-xl opacity-75' />
            <p className="font-extralight opacity-75">Total Pages</p>
          </div>
          <p className=" font-medium text-primary-txt opacity-75">{book.pages}</p>
        </div>

  <div className="mb-2 flex flex-row justify-between">
  <div className='flex flex-row items-center gap-1'>
    <IoMdCreate className='text-primary-txt' />
    <p className="font-light opacity-75">Created At</p>
    </div>
    <p className=" font-medium text-primary-txt opacity-95">
      {new Date(book.createdAt).toLocaleString()}
    </p>
  </div>

  <div className='flex flex-row justify-between'>
  <div className='flex flex-row items-center gap-1'>
    <MdOutlineUpdate  className='text-primary-txt' />
    <p className="font-light opacity-75">Last Update</p>
    </div>
    <p className=" font-medium text-primary-txt opacity-95">
      {new Date(book.updatedAt).toLocaleString()}
    </p>
  </div>
</div>

        
        )
      }
    </div>
  )
}

export default showBook
