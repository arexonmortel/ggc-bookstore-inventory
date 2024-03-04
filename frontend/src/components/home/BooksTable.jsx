import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Title</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Author
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Genre
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Publisher
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Approved By
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Education Level
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Availability
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Publish Year
          </th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {book.title}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.author}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.genre}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.publisher}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.approvedBy}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.eduLevel}
            </td>
            <td className={`border border-slate-700 rounded-md text-center max-md:hidden ${book.isAvailable ? 'bg-green-400' : 'bg-red-400'}`}>
              {book.isAvailable ? 'In stock' : 'Out of stock'}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.pubYear}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
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