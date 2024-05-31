import { useState, useEffect } from 'react';

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    
  }, [token]);
  

  return { loggedIn };
};

export default useAuth;
