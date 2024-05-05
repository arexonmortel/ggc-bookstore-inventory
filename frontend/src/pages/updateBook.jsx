import React, { useEffect, useState } from 'react';
import BackButton from '../components/home/BackButton';
import Spinner from '../components/spinner';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function updateformData() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [bookSize, setBookSize] = useState('');
  const [pages, setPages] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publisher, setPublisher] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [eduLevel, setEduLevel] = useState('');
  const [availability, setAvailability] = useState(false);
  const [pubYear, setPubYear] = useState('');

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        const formData = res.data;
        setTitle(formData.title);
        setAuthor(formData.author);
        setGenre(formData.genre);
        setPublisher(formData.publisher);
        setApprovedBy(formData.approvedBy);
        setEduLevel(formData.eduLevel);
        setAvailability(formData.availability);
        setPubYear(formData.pubYear);
        setIsbn(formData.isbn);
        setBookSize(formData.bookSize);
        setPages(formData.pages);
        setImagePreview(formData.imageUrl);
        setImageName(formData.image);

        fetchImage(formData.imageUrl, formData.image);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Fetching the image URL from S3 and convert it to file
  // then save it to image react state
  const fetchImage = async (imageUrl, s3ImageName) => {
    try {
      // Fetch the image data
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a new File object
      const imageName = s3ImageName;
      const imageFile = new File([blob], imageName, { type: 'image/jpeg' });

      // Set the image state
      setImage(imageFile);
      console.log('image from the S3: ', imageName, ' :', imageFile);
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log('image replace from system:', image);
    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEditformData = () => {
    setLoading(true);
    setErrorMessage('');

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
    formData.append('imageName', imageName);

    if (
      !image ||
      !title ||
      !author ||
      !genre ||
      !publisher ||
      !approvedBy ||
      !eduLevel ||
      !pubYear ||
      !imageName
    ) {
      setLoading(false);
      setErrorMessage('All fields are required.');
      return; // Prevent further execution if any required field is empty
    }
    axios
      .put(`http://localhost:5555/books/${id}`, formData)
      .then((response) => {
        console.log(formData);
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.log(formData);
        console.log(error);
        setLoading(false);
      });
    setErrorMessage('');
  };

  return (
    <div className="p-4">
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-[600px] rounded-xl mx-auto">
          <h1 className="text-3xl my-3 font-semibold opacity-85">Edit Book</h1>
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
                  alt="formData Preview"
                  className="mt-2 rounded-md shadow-md max-h-36"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <label
              htmlFor="title"
              className="block text-sm font-light text-gray-600 "
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg mb-[-5px] mt-[-15px]"
              required
            />

            <label
              htmlFor="author"
              className="block text-sm font-light text-gray-600 "
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              placeholder="Enter the author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg mb-[-5px] mt-[-15px]"
              required
            />

            <label
              htmlFor="genre"
              className="block text-sm font-light text-gray-600 "
            >
              Genre
            </label>
            <input
              type="text"
              id="genre"
              placeholder="Enter the genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg mb-[-5px] mt-[-15px]"
              required
            />

            <label
              htmlFor="publisher"
              className="block text-sm font-light text-gray-600 "
            >
              Publisher
            </label>
            <input
              type="text"
              id="publisher"
              placeholder="Enter the publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg mb-[-5px] mt-[-15px]"
              required
            />

            <label
              htmlFor="approvedBy"
              className="block text-sm font-light text-gray-600 "
            >
              Approved By
            </label>
            <input
              type="text"
              id="approvedBy"
              placeholder="Enter the approver"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg mb-[-5px] mt-[-15px]"
              required
            />

            <label
              htmlFor="eduLevel"
              className="block text-sm font-light text-gray-600 "
            >
              Education Level (e.g., Grade 1, Grade 2, etc.)
            </label>
            <input
              type="text"
              id="eduLevel"
              placeholder="Enter the education level"
              value={eduLevel}
              onChange={(e) => setEduLevel(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg mb-[-5px] mt-[-15px]"
              required
            />

            <label
              htmlFor="pubYear"
              className="block text-sm font-light text-gray-600 "
            >
              Publication Year
            </label>
            <input
              type="number"
              id="pubYear"
              placeholder="Enter the publication year"
              value={pubYear}
              onChange={(e) => setPubYear(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg mb-[-5px] mt-[-15px]"
              required
              min="1900" // Adjust the minimum year as needed
              max={new Date().getFullYear()} // Set the maximum year to the current year
            />

            <label
              htmlFor="isbn"
              className="block text-sm font-light text-gray-600"
            >
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              placeholder="Enter the ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg mb-[-5px] mt-[-15px]"
              required
            />

            <label
              htmlFor="bookSize"
              className="block text-sm font-light text-gray-600"
            >
              Book Size
            </label>
            <input
              type="text"
              id="bookSize"
              placeholder="Enter the book size"
              value={bookSize}
              onChange={(e) => setBookSize(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg mb-[-5px] mt-[-15px]"
              required
            />

            <label
              htmlFor="pages"
              className="block text-sm font-light text-gray-600"
            >
              Pages
            </label>
            <input
              type="number"
              id="pages"
              placeholder="Enter the number of pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg mb-[-5px] mt-[-15px]"
              required
            />

            <label
              htmlFor="availability"
              className="block text-sm font-light text-gray-600 "
            >
              No. of Copies
            </label>
            <input
              type="number"
              id="availability"
              placeholder="Enter the number of copies"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="p-2 border-2 border-gray-200 rounded-lg mb-[-5px] mt-[-15px]"
              required
            />

            <button
              className="bg-primary-txt text-white px-4 py-2 rounded-lg  w-1/2 self-center transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring focus:border-primary-txt"
              onClick={handleEditformData}
            >
              Update Book
            </button>
            {errorMessage && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default updateformData;
