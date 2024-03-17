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
      <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>Genre</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>Educational Level</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>Publisher</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>Year of Publication</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>Approved By</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>ISBN</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>Book Size</th>
      <th className='border border-slate-600 rounded-md max-md:hidden'>Pages</th>
      <th className='border border-slate-600 rounded-md'>No. of Copies</th>
      <th className='border border-slate-600 rounded-md'>Operations</th>
    </tr>
  </thead>
  <tbody>
    {books.map((book, index) => (
      <tr key={book._id} className='h-8'>
        <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
        <td className='border border-slate-700 rounded-md'><p className='ml-4'>{book.title}</p></td>
        <td className='border border-slate-700 rounded-md max-md:hidden'><p className='ml-4'>{book.author}</p></td>
        <td className='border border-slate-700 rounded-md max-md:hidden'><p className='ml-4'>{book.genre}</p></td>
        <td className='border border-slate-700 rounded-md max-md:hidden'><p className='ml-4'>{book.eduLevel}</p></td>
        <td className='border border-slate-700 rounded-md max-md:hidden'><p className='ml-4'>{book.publisher}</p></td>
        <td className='border border-slate-700 rounded-md max-md:hidden'><p className='ml-4'>{book.pubYear}</p></td>
        <td className={`border border-slate-700 rounded-md text-center max-md:hidden`}>{book.approvedBy}</td>
        <td className='border border-slate-700 rounded-md'><p className='ml-4'>{book.isbn}</p></td>
        <td className='border border-slate-700 rounded-md'><p className='ml-4'>{book.bookSize}</p></td>
        <td className='border border-slate-700 rounded-md'><p className='ml-4'>{book.pages}</p></td>
        <td className= {`border border-slate-700 rounded-md text-center max-md:hidden ${book.availability ? 'bg-green-300' : 'bg-red-300'}`}>
          {book.availability.toLocaleString()}
        </td>
        <td className='border border-slate-700 rounded-md text-center'>
          <div className='flex justify-center gap-x-4 px-3'>
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