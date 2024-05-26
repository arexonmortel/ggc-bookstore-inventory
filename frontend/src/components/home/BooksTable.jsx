import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const BooksTable = ({ books}) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
  <thead>
    <tr>
      <th className='border border-slate-600 rounded-md'>No</th>
      <th className='border border-slate-600 rounded-md'>Title</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>Genre</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>Grade Level</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>Publisher</th>
      <th className='border border-slate-600 rounded-md max-md:hidden text-wrap max-w-24'>Year of Publication</th>
      <th className='border border-slate-600 rounded-md text-wrap'>Approved By</th>
      {/* <th className='border border-slate-600 rounded-md max-md:hidden'>ISBN</th> */}
      {/* <th className='border border-slate-600 rounded-md max-md:hidden'>Book Size (cm)</th> */}
      {/* <th className='border border-slate-600 rounded-md max-md:hidden'>Total Pages</th> */}
      <th className='border border-slate-600 rounded-md max-md:hidden text-wrap max-w-16'>No. of Copies</th>
      <th className='border border-slate-600 rounded-md'>Operations</th>
    </tr>
  </thead>
  <tbody>
    {books.map((book, index) => (
      <tr key={book._id} className='h-8'>
        <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
        <td className='border border-slate-700 rounded-md max-w-40'><p className=' ml-2  truncate hover:text-clip'>{book.title}</p></td>
        <td className='border border-slate-700 rounded-md max-md:hidden max-w-36'><p className='ml-2  truncate hover:text-clip'>{book.author}</p></td>
        <td className='border border-slate-700 rounded-md max-md:hidden max-w-24'><p className='text-center  truncate hover:text-clip'>{book.genre}</p></td>
        <td className='border border-slate-700 rounded-md max-md:hidden max-w-32'><p className='ml-2  truncate hover:text-clip'>{book.eduLevel}</p></td>
        <td className='border border-slate-700 rounded-md max-md:hidden max-w-24'><p className='text-center  truncate hover:text-clip'>{book.publisher}</p></td>
        <td className='border border-slate-700 rounded-md max-md:hidden'><p className='text-center'>{book.pubYear}</p></td>
        <td className='border border-slate-700 rounded-md max-w-24'><p className='text-center  truncate hover:text-clip'>{book.approvedBy}</p> </td>
       {/*  <td className='border border-slate-700 rounded-md max-md:hidden  '><p className='ml-2 truncate'>{book.isbn}... </p></td> */}
        {/* <td className='border border-slate-700 rounded-md max-md:hidden'><p className='ml-2'>{book.bookSize}</p></td> */}
        {/* <td className='border border-slate-700 rounded-md max-md:hidden'><p className='ml-2'>{book.pages}</p></td> */}
        <td className= {`border border-slate-700 rounded-md text-center max-md:hidden ${book.availability ? 'bg-green-300' : 'bg-red-300'}`}>
          {book.availability.toLocaleString()}
        </td>
        <td className='border border-slate-700 rounded-md text-center'>
          <div className='flex justify-center'>
            <Link to={`/books/details/${book._id}`}>
              <Tooltip title='info' placement="top" arrow>
                <IconButton>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to={`/books/edit/${book._id}`}>
              <Tooltip title="edit" placement="top" arrow>
                <IconButton>
                  <AiOutlineEdit className='text-2xl text-blue-600' />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to={`/books/delete/${book._id}`}>
              <Tooltip title = "delete" placement="top" arrow>
                <IconButton>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </IconButton>
              </Tooltip>
            </Link>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  );
};

export default BooksTable;