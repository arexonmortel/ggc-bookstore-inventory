import React, { useState, useRef, useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select'
import Spinner from '../spinner';

function SearchInput({ onSearch, onBooksFound }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState('');
  const [loading, setLoading] = useState(false);
  const prevSearchTerm = useRef('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (selectedOption) => {   
    setSearchTerm(selectedOption.value);
    setFiltered(selectedOption.value);
  
  };
  useEffect(()=>{
    if(filtered === prevSearchTerm.current){
      return;
    }
    if(filtered === ''){
      onSearch({count: 0, books: []});
      return;
    }
    handleSubmit();
  },[filtered])

  const handleSubmit = async () => {
    setLoading(true);
    console.log('Previous value:', prevSearchTerm.current);
    console.log('Current value:', searchTerm);
    prevSearchTerm.current = searchTerm;
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

  // 
  const options = [
    { value: 'Merryland', label: 'Merryland' },
    { value: 'Jedigar', label: 'Jedigar' },
    { value: 'B2g2', label: 'B2g2' },
  ];
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '2px solid #e2e8f0',
      borderRadius: '0.375rem',
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

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex items-center gap-1">
      <p className="text-primary-txt text-opacity-95">Filter by:</p>
        <Select
          className="rounded-lg p-2 py-3 outline-none"
          options={options}
          onChange={handleSelectChange}
          styles={customStyles}
          placeholder="Select Company"
        />
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search Book..."
        className="px-4 py-[.4rem] border border-gray-300 rounded-md focus:outline-none focus:border-primary-txt"
      />
      <button
        type="submit"
        className="px-4 py-[.4rem] bg-primary-txt text-white rounded-md hover:bg-opacity-80 focus:outline-none focus:bg-primary-txt"
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
