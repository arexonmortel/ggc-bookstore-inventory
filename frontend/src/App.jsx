import {useState, useEffect}from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CreateBook from './pages/createBook';
import UpdateBook from './pages/updateBook';
import DeleteBook from './pages/deleteBook';
import ShowBook from './pages/showBook';
import Login from './pages/login';
import './index.css';
import "tw-elements-react/dist/css/tw-elements-react.min.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);

  useEffect(() => {
    // Function to handle token change
    const handleTokenChange = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };

    // Add event listener for storage change
    window.addEventListener('storage', handleTokenChange);

    // Cleanup function for removing event listener
    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  return (
    <div className='font-primary text-primary-txt bg-primary-bg '>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Login />} />
        
        {/* Private Routes - Requires Authentication */}
        {loggedIn ? (
          <>
            <Route path='/home' element={<Home/>} />
            <Route path='/books/create' element={<CreateBook />} />
            <Route path='/books/details/:id' element={<ShowBook />} />
            <Route path='/books/edit/:id' element={<UpdateBook />} />
            <Route path='/books/delete/:id' element={<DeleteBook />} />
          </>
        ) : (
          // Redirect to Login if not authenticated
          <Route path='*' element={<Login />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
