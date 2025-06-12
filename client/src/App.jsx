import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import AllRoutes from './AllRoutes'
import { getAllUsers } from './action/users'
import { getAllQuestions } from './action/question'
import { useDispatch } from 'react-redux'

const App = () => {
  const [slideIn, setSlideIn] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllQuestions())
  }, [dispatch])

  useEffect(() => {
    if(window.innerWidth <= 768){
      setSlideIn(false)
    }
  }, [])
  const handleSlideIn = () => {
    if(window.innerWidth <= 768){
      setSlideIn((state) => !state)
    }
  }
  return (
    <>
      <Router>
        <Navbar handleSlideIn = {handleSlideIn} />
        <AllRoutes slideIn = {slideIn} handleSlideIn = {handleSlideIn} />
      </Router>
    </>
  )
}

export default App