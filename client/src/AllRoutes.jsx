import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import AskQuestion from './pages/askQuestion/AskQuestion'
import Auth from './pages/auth/Auth'
import Question from './pages/question/Question'
import DisplayQuestion from './pages/question/DisplayQuestion'
import Tags from './pages/tags/Tags'
import Users from './pages/users/Users'
import UserProfile from './pages/userProfile/UserProfile'

const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <Routes>
      <Route path='/' element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
      <Route path='/askQuestion' element={<AskQuestion />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/questions' element={<Question slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
      <Route path='/questions/:id' element={<DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
      <Route path='/tags' element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
      <Route path='/users' element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
      <Route path='/users/:id' element={<UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />} />
    </Routes>
  )
}

export default AllRoutes