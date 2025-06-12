import React from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../components/avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAnswer } from '../../action/question'

const DisplayAnswer = ({question, handleShare}) => {
  const user = useSelector((state) => state.currentUserReducer)
  const dispatch = useDispatch()
  const {id} = useParams();

  const handleDelete = (answerId, noOfAnswer) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswer - 1))
  }
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.answerBody}</p>
          <div className="question-actions-user">
            <div>
              <button type='button' onClick={handleShare}>Share</button>
              {user?.result?._id === ans?.userId && (
                <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers)}>Delete</button>
              )}
            </div>
            <p>Answered {moment(ans.answeredOn).fromNow()}</p>
            <Link to={`/users/${ans.userId}`} className='user-link' style={{color: '#0086d8'}}>
              <Avatar backgroundColor="orange" px='8px' py='5px' borderRadius='4px'>
                {ans.userAnswered?.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                {ans.userAnswered}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayAnswer