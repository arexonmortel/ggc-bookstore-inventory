import { useState } from 'react';
import BackButton from '../components/home/BackButton';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function createBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publisher, setPublisher] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [eduLevel, setEduLevel] = useState('');
  const [availability, setAvailability] = useState('');
  const [pubYear, setPubYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const [bookSize, setBookSize] = useState('');
  const [pages, setPages] = useState('');
  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      toast.error('Please select a valid image file.');
      e.target.value = null; // Clear the input
    }
    console.log(file);

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('author', author);
      formData.append('genre', genre);
      formData.append('publisher', publisher);
      formData.append('approvedBy', approvedBy);
      formData.append('eduLevel', eduLevel);
      formData.append('availability', availability);
      formData.append('pubYear', pubYear);
      formData.append('isbn', isbn);
      formData.append('bookSize', bookSize);
      formData.append('pages', pages);

      const response = await axios.post(
        'http://localhost:5555/books',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setTitle('')
      setAuthor('')
      setGenre('')
      setPublisher('')
      setApprovedBy('')
      setEduLevel('')
      setAvailability('')
      setPubYear('')
      setIsbn('')
      setBookSize('')
      setPages('')
      setImage(null)
      setImagePreview(null)

      setLoading(false);
      toast.success('Book created successfully!', {
        onClose: () => navigate('/')
      });
    } catch (error) {
      console.error('Error creating book:', error);
      setLoading(false);
      setErrorMessage('Error creating book. All fields are required.');
      toast.error('Error creating book. All fields are required.');
    }
  };

  const handlePubYearChange = (e) => {
    const currentYear = new Date().getFullYear();
    let value = e.target.value;

    // Ensure the entered year is not greater than the current year
    if (value > currentYear) {
      value = currentYear;
    }

    setPubYear(value);
  };
  
  const optionsPublisher = [
    { value: 'Merryland', label: 'Merryland' },
    { value: 'Jedigar', label: 'Jedigar' },
    { value: 'B2g2', label: 'B2g2' },
  ];
  const optionsApproved = [
    { value: 'DepEd', label: 'DepEd' },
    { value: 'For Approval', label: 'For Approval' },
  ];
  const optionsBookSize = [
    { value: '7" x 10"', label: 'Small - 7" x 10' },
    { value: '12" x 18"', label: 'Big - 12" x 18' },
  ];
  const optionsGenre = [
    { value: 'Storybook', label: 'Storybook' },
    { value: 'Science Modules', label: 'Science Modules' },
    { value: 'Workbook', label: 'Workbook' },
    { value: 'Math Modules', label: 'Math Modules' },
    { value: 'Pre Elementary', label: 'Pre Elementary' },
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

  const handleIsbnChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatIsbn(value);
    setIsbn(formattedValue);
  };

  const formatIsbn = (value) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');

    // Limit the input to 13 digits
    const limitedDigits = digitsOnly.substring(0, 13);

    // Insert dashes at the correct positions
    let formattedValue = '';
    for (let i = 0; i < limitedDigits.length; i++) {
      if (i === 3 || i === 6 || i === 9 || i === 12) {
        formattedValue += '-';
      }
      formattedValue += limitedDigits[i];
    }

    return formattedValue;
  };

  return (
    <div className="p-4">
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-[600px] rounded-xl mx-auto">
          <h1 className="text-3xl my-3 font-semibold opacity-85">
            Create Book
          </h1>
          <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col justify-center">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Choose Image
                </label>
                <input
                  type="file"
                  className="p-2 border rounded-md"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Book Preview"
                    className="mt-2 rounded-md shadow-md max-h-36"
                  />
                )}
              </div>
            </div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-gray-300"
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-gray-300"
              required
            />
          <Select
          className="rounded-lg outline-none"
          options={optionsGenre}
          onChange= {(e) => {setGenre(e.value)}}
          styles={customStyles}
          placeholder="Genre"
        />
        <Select
          className="rounded-lg outline-none"
          options={optionsPublisher}
          onChange= {(e) => {setPublisher(e.value)}}
          styles={customStyles}
          placeholder="Publisher"
        />
        <Select
          className="rounded-lg outline-none"
          options={optionsApproved}
          onChange= {(e) => {setApprovedBy(e.value)}}
          styles={customStyles}
          placeholder="Approved By"
        />
            <input
              type="text"
              placeholder="Education Level (e.g. Grade 1, Grade 2, etc.)"
              value={eduLevel}
              onChange={(e) => setEduLevel(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-gray-300"
              required
            />
            <input
              type="number"
              placeholder="Publication Year"
              value={pubYear}
              onChange={handlePubYearChange}
              className="p-2 border-2 border-gray-200 rounded-lg placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-gray-300"
              required
              min="1900" // Adjust the minimum year as needed
              max={new Date().getFullYear()} // Set the maximum year to the current year
            />
    <input
      type="text"
      placeholder="ISBN"
      value={isbn}
      onChange={handleIsbnChange}
      className="p-2 border-2 border-gray-200 rounded-lg placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-gray-300"
      required
    />
        <Select
          className="rounded-lg outline-none"
          options={optionsBookSize}
          onChange= {(e) => {setBookSize(e.value)}}
          styles={customStyles}
          placeholder="Book Size"
        />
            <input
              type="number"
              placeholder="Pages"
              value={pages}
              min={1}
              onChange={(e) => setPages(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-gray-300"
              required
            />
            <input
              type="number"
              placeholder="No. of Copies"
              value={availability}
              min={0}
              onChange={(e) => setAvailability(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-gray-300"
              required
            />
            <button
              className="bg-primary-txt text-white px-4 py-2 rounded-lg w-1/2 self-center transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:border-primary-txt"
              onClick={handleCreateBook}
            >
              Save Book
            </button>
            {errorMessage && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}
          </div>
      <ToastContainer
      autoClose={3000} />
        </div>
      )}
    </div>
  );
}

export default createBook;
