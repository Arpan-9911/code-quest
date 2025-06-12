import React, { useEffect } from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import bars from '../../assets/bars-solid.svg'
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../avatar/Avatar'
import {setCurrentUser} from '../../action/currentUser'
import {jwtDecode} from 'jwt-decode'

const Navbar = ({ handleSlideIn }) => {
  var User = useSelector((state) => state.currentUserReducer)
  // console.log(User)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
    dispatch(setCurrentUser(null))
  }

  useEffect(() => {
    const token = User?.token
    if(token){
      const decodedToken = jwtDecode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout()
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
  }, [User?.token, dispatch])
  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon" onClick={handleSlideIn}>
          <img src={bars} alt="bars" width={15} />
        </button>
        <div className="navbar-1">
          <Link to='/' className='nav-item nav-logo'>
            <img src={logo} alt="logo" />
          </Link>
          <Link to='/' className="nav-item nav-btn res-nav">About</Link>
          <Link to='/' className="nav-item nav-btn res-nav">Products</Link>
          <Link to='/' className="nav-item nav-btn res-nav">For Teams</Link>
          <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width={18} className='search-icon' />
          </form>
        </div>
        <div className="navbar-2">
          {
            User === null ? (
              <Link to='/auth' className="nav-item nav-link">Log In</Link>
            )
            : (
              <>
                <Avatar
                  backgroundColor='#009dff'
                  px='10px'
                  py='7px'
                  borderRadius='50%'
                  color='white'
                >
                  <Link
                    to={`/users/${User?.result?._id}`}
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    {User.result.name.charAt(0).toUpperCase()}
                  </Link>
                </Avatar>
                <button className='nav-item nav-link' onClick={handleLogout}>Log Out</button>
              </>
            )
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar