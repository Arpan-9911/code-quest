import React from 'react'
import './homeMainBar.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import QuestionList from './QuestionList'

const HomeMainBar = () => {
  const user = useSelector((state)=>state.currentuserreducer)
  const location = useLocation();
  const navigate = useNavigate();
  const qList = useSelector((state)=>state.questionReducer)
  // console.log(qList)
  const checkAuth = () => {
    if (user === null) {
      alert("Login or signup to ask a question")
      navigate("/auth")
    } else {
      navigate("/askQuestion")
    }
  }
  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {
          location.pathname === '/' ? (
            <h1>Top Questions</h1>
          ) : (
            <h1>All Questions</h1>
          )
        }
        <button className="ask-btn" onClick={checkAuth}>Ask Questions</button>
      </div>
      <div>
        {
          qList.data === null ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <p>{qList.data.length} Questions</p>
              <QuestionList qList = {qList.data} />
            </>
          )
        }
      </div>
    </div>
  )
}

export default HomeMainBar