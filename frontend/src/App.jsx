import React, {useState}from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import CreateBook from './pages/createBook'
import UpdateBook from './pages/updateBook'
import DeleteBook from './pages/deleteBook'
import ShowBook from './pages/showBook'
import './index.css'

function App() {
  return (
   <div className='font-primary text-primary-txt bg-primary-bg '>
     <Routes>
      <Route path='/' element= {<Home/>} />
      <Route path='/books/create' element= {<CreateBook/>} />
      <Route path='/books/details/:id' element= {<ShowBook/>} />
      <Route path='/books/edit/:id' element= {<UpdateBook/>} />
      <Route path='/books/delete/:id' element= {<DeleteBook/>} />
    </Routes>
   </div>
  )
}

export default App
