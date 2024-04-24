import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../spinner';

function SearchInput({ onSearch, onBooksFound }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    
  };

  const handleDropdownChange = (event) => {
    const selectedTerm = event.target.value;
    setSearchTerm(selectedTerm); // Set the search term to the selected option value
    setLoading(true); // Show loading spinner
    console.log("current search term is", searchTerm)
    if (selectedTerm) { 
      handleSubmit(); // Automatically trigger search if an option is selected
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5555/books/search', {
        params: { q: searchTerm }
      });
      console.log(response.data.count)
      onSearch(response.data);
      onBooksFound(true); // Indicate that books were found
    } catch (error) {
      onBooksFound(false); // Indicate that no books were found
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex items-center gap-6">
      <select
        value={searchTerm}
        onChange={handleDropdownChange}
        className="ml-2 px-4 py-[.4rem] border border-gray-300 rounded-md focus:outline-none focus:border-primary-txt"
      >
        <option value="">Select Company</option>
        <option value="merryland">Merryland</option>
        <option value="jedigar">Jedigar</option>
        <option value="b2g2">B2G2</option>
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search Book..."
        className="px-4 py-[.4rem] border border-gray-300 rounded-md focus:outline-none focus:border-primary-txt"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-[.4rem] bg-primary-txt text-white rounded-md hover:bg-opacity-80 focus:outline-none focus:bg-primary-txt"
      >
        Search
      </button>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-primary-bg bg-opacity-75 z-50">
          <Spinner className="text-white" />
        </div>
      )}
    </form>
  );
}

export default SearchInput;
