import React, {useState, useEffect} from 'react';
import Spinner from '../components/spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function deleteBook() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState({})

  const handleDeleteBook = ()=>{
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`)
    .then((res)=>{
      setLoading(false)
      navigate('/')
    })
  }

  const handleCancel = ()=>{
    navigate('/');
  }
  return (
    <div className='p-4'>
      {loading && <Spinner />}
      <div className='w-[400px] rounded-xl mx-auto p-6 bg-white shadow-md'>
        <h1 className='text-3xl font-semibold mb-3 opacity-85'>Delete Book</h1>
        <div className='flex flex-col gap-y-4'>
          <p >Are you sure you want to delete this book?</p>
          <div className='flex justify-between'>
            <button
              onClick={handleDeleteBook}
              className='bg-red-500 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-red-500 hover:ring-inset hover:ring-1 hover:ring-red-500 mr-2'
            >
              Delete
            </button>
            <button
              onClick={handleCancel}
              className='bg-primary-txt opacity-75 text-white  px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-primary-txt hover:ring-inset hover:ring-1 hover:ring-gray-500'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default deleteBook
