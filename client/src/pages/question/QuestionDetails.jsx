import React, { useState } from 'react'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import './question.css'
import Avatar from '../../components/avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { deleteQuestion, voteQuestion, postAnswer } from '../../action/question'
import { useDispatch } from 'react-redux'

const QuestionDetails = () => {
  const [answer, setAnswer] = useState('')
  const qList = useSelector((state) => state.questionReducer);
  // console.log(qList)

  const {id} = useParams();
  const user = useSelector((state) => state.currentUserReducer);
  const url = "http://localhost:5173";
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleShare = () => {
    copy(url + location.pathname)
    alert("Copied url: " + url + location.pathname)
  }

  const handleUpVote = () => {
    if(user === null){
      alert('Login or signup to vote on a question')
      navigate('/auth')
    }
    else{
      dispatch(voteQuestion(id, "upvote"))
    }
  }

  const handleDownVote = () => {
    if(user === null){
      alert('Login or signup to vote on a question')
      navigate('/auth')
    }
    else{
      dispatch(voteQuestion(id, "downvote"))
    }
  }

  const handleDelete = () => {
    if(user === null){
      alert('Login or signup to delete a question')
      navigate('/auth')
    }
    else{
      dispatch(deleteQuestion(id, navigate))
    }
  }

  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault();
    if(user === null){
      alert('Login or signup to answer a question')
      navigate('/auth')
    }else{
      if(answer === ''){
        alert('Enter an answer before submitting')
      }else{
        dispatch(postAnswer({id, noOfAnswers: answerLength + 1, answerBody: answer, userAnswered: user.result.name, userId: user.result._id}))
        setAnswer('')
        alert('Answer posted successfully')
      }
    }
  }

  return (
    <div className="question-details-page">
      {qList.data === null ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          {qList.data.filter((question) => question._id === id).map((question) => (
            <div key={question._id}>
              <section className="question-details-container">
                <h1>{question.questionTitle}</h1>
                <div className="question-details-container-2">
                  <div className="question-votes">
                    <img src={upvote} alt="" width={18} className='votes-icon' onClick={handleUpVote} />
                    <p>{question.upvote.length - question.downvote.length}</p>
                    <img src={downvote} alt="" width={18} className='votes-icon' onClick={handleDownVote} />
                  </div>
                  <div style={{width: "100%"}}>
                    <p className='question-body'>{question.questionBody}</p>
                    <div className="question-details-tags">
                      {
                        question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))
                      }
                    </div>
                    <div className="question-actions-user">
                      <div>
                        <button type='button' onClick={handleShare}>Share</button>
                        {user?.result?._id === question?.userId && (
                          <button type='button' onClick={handleDelete}>Delete</button>
                        )}
                      </div>
                      <div>
                        <p>Asked {moment(question.askedOn).fromNow()}</p>
                        <Link to={`/users/${question.userId}`} className='user-link' style={{color: '#0086d8'}}>
                          <Avatar backgroundColor="orange" px='8px' py='5px' borderRadius='4px'>
                            {question.userPosted.charAt(0).toUpperCase()}
                          </Avatar>
                          <div>
                            {question.userPosted}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {question.noOfAnswers !== 0 && (
                <section>
                  <h3>{question.noOfAnswers} Answers</h3>
                  <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                </section>
              )}
              <section className="post-ans-container">
                <h3>Your Answer</h3>
                <form onSubmit={(e)=>{
                  handlePostAnswer(e, question.answer.length)
                }}>
                  <textarea 
                    cols="30"
                    rows="10"
                    id=''
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  ></textarea>
                  <br />
                  <input type="submit" className='post-ans-btn' value="Post Your Answer" />
                </form>
                <p>
                  Browse Other Questions Tagged
                  {question.questionTags.map((tag) => (
                    <Link
                      to="/tags"
                      key={tag}
                      className="ans-tag"
                    >
                      {" "}{tag}{" "}
                    </Link>
                  ))}{" "}
                  or
                  <Link to="/askQuestion" style={{ textDecoration: "none", color: "#009dff" }}>
                    {" "}Ask your own question.
                  </Link>
                </p>
              </section>
            </div>  
          ))}
        </>
      )}
    </div>
  )
}

export default QuestionDetails