import React from 'react'
import LeftSideBar from '../../components/leftSideBar/LeftSideBar'
import './users.css'
import UsersList from './UsersList'

const Users = ({ slideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSideBar slideIn={slideIn} />
      <div className="home-container-2" style={{marginTop: "30px"}}>
        <h1 style={{fontWeight: "400"}}>Users</h1>
        <UsersList />
      </div>
    </div>
  )
}

export default Users