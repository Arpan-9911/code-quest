import React from 'react'
import LeftSideBar from '../../components/leftSideBar/LeftSideBar'
import RightSideBar from '../../components/rightSideBar/RightSideBar'
import QuestionDetails from './QuestionDetails'

const DisplayQuestion = ({ slideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSideBar slideIn={slideIn} />
      <div className="home-container-2">
        <QuestionDetails />
        <RightSideBar />
      </div>
    </div>
  )
}

export default DisplayQuestion