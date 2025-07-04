import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Question = ({question}) => {
  return (
    <div className='display-question-container'>
      <div className="display-votes-ans">
        <p>{question.upvote.length - question.downvote.length}</p>
        <p>Votes</p>
      </div>
      <div className="display-votes-ans">
        <p>{question.noOfAnswers}</p>
        <p>Answres</p>
      </div>
      <div className="display-question-details">
        <Link to={`/questions/${question._id}`} className='question-title-link'>
          {
            question.questionTitle.length > (window.innerWidth <= 400 ? 70 : 90) ? (
              question.questionTitle.substring(0, window.innerWidth <= 400 ? 70 : 90) + '...'
            ) : (
              question.questionTitle
            )
          }
        </Link>
        <div className="display-tags-time">
          <div className="display-tags">
            {
              question.questionTags.map((tag) => (
                <p key={tag}>{tag}</p>
              ))
            }
          </div>
          <p className="display-time">
            Asked {moment(question.askedOn).fromNow()}, {question.userPosted}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Question