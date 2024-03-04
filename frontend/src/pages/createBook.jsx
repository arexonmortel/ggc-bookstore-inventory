import React, {useState}from 'react'
import BackButton from '../components/home/BackButton'
import Spinner from '../components/spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function createBook() {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const [publisher, setPublisher] = useState('')
  const [approvedBy, setApprovedBy] = useState('')
  const [eduLevel, setEduLevel] = useState('')
  const [isAvailable, setIsAvailable] = useState(false)
  const [pubYear, setPubYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateBook = ()=>{
    setLoading(true)
    setErrorMessage('');
    const book = {
      title,
      author,
      genre,
      publisher,
      approvedBy,
      eduLevel,
      isAvailable,
      pubYear
    }
    if (!title || !author || !genre || !publisher || !approvedBy || !eduLevel || !pubYear) {
      setLoading(false);
      setErrorMessage('All fields are required.');
      return; // Prevent further execution if any required field is empty
    }
    axios.post('http://localhost:5555/books', book)
    .then((response)=>{
      setLoading(false)
      navigate('/')
    })
    .catch((error)=>{
      console.log(error)
      setLoading(false)
    })
    setErrorMessage('');
  }

  return (
    <div className='p-4'>
    <BackButton />
    {loading ? (<Spinner />): (
    <div className='w-[600px] rounded-xl mx-auto'>
      <h1 className='text-3xl my-3 font-semibold opacity-85'>Create Book</h1>
      <div className='flex flex-col gap-y-4'>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='p-2 border-2 border-gray-200 rounded-lg capitalize'
          required
        />
        <input
          type='text'
          placeholder='Author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='p-2 border-2 border-gray-200 rounded-lg capitalize'
          required
        />
        <input
          type='text'
          placeholder='Genre'
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className='p-2 border-2 border-gray-200 rounded-lg capitalize'
          required
        />
        <input
          type='text'
          placeholder='Publisher'
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          className='p-2 border-2 border-gray-200 rounded-lg capitalize'
          required
        />
        <input
          type='text'
          placeholder='Approved By'
          value={approvedBy}
          onChange={(e) => setApprovedBy(e.target.value)}
          className='p-2 border-2 border-gray-200 rounded-lg capitalize'
          required
        />
        <input
          type='text'
          placeholder='Education Level (e.g. Grade 1, Grade 2, etc.)'
          value={eduLevel}
          onChange={(e) => setEduLevel(e.target.value)}
          className='p-2 border-2 border-gray-200 rounded-lg capitalize'
          required
        />
        <input
          type='number'
          placeholder='Publication Year'
          value={pubYear}
          onChange={(e) => setPubYear(e.target.value)}
          className='p-2 border-2 border-gray-200 rounded-lg capitalize'
          required
          min='1900' // Adjust the minimum year as needed
          max={new Date().getFullYear()} // Set the maximum year to the current year
        />
        <div className='flex items-center gap-x-4'>
          <label htmlFor='isAvailable'>In Stock?</label>
          <input
            type='checkbox'
            id='isAvailable'
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </div>
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
  )
}

export default createBook
