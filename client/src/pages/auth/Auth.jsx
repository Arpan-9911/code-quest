import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { login, signUp } from '../../action/auth'

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email && !password) {
      alert('Enter email and password');
    }
    if(isSignUp){
      if(!name){
        alert('Enter a name to continue');
      }
      else{
        dispatch(signUp({ name, email, password }, navigate));
        // console.log(name, email, password);
      }
    }
    else{
      dispatch(login({ email, password }, navigate));
      // console.log(email, password);
    }
  }

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <section className="auth-section">
      { isSignUp && <AboutAuth /> }
      <div className="auth-container-2">
        <img src={icon} alt="icon" className='login-logo' />
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input 
                type="text" 
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input 
              type="email" 
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4>Password</h4>
              { !isSignUp && (
                <p style={{ color: '#007ac6', fontSize: '13px' }}>Forgot Password?</p>
              )}
            </div>
            <input 
              type="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type='submit' className="auth-btn">
            { isSignUp ? 'Sign Up' : 'Log In' }
          </button>
        </form>
        <p>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button type='button' className="handle-switch-btn" onClick={handleSwitch}>
            { isSignUp ? "Log In" : "Sign Up" }
          </button>
        </p>
      </div>
    </section>
  )
}

export default Auth