import React from 'react'
import Question from './Question'

const QuestionList = ({ qList }) => {
  return (
    <>
      {qList.map((question) => (
        <Question question={question} key={question._id} />
      ))}
    </> 
  )
}

export default QuestionList