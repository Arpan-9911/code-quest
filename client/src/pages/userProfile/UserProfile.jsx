import React, { useState } from 'react'
import LeftSideBar from '../../components/leftSideBar/LeftSideBar'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import Avatar from '../../components/avatar/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './userProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import {useSelector} from 'react-redux'

const UserProfile = ({ slideIn }) => {
  const {id} = useParams();
  const [Switch, setSwitch] = useState(false);
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users?.filter((user) => user._id === id)[0];

  const localProfile = JSON.parse(localStorage.getItem("profile"));
  const currentUser = users.find(user => user._id === localProfile?.result?._id);
  
  return (
    <div className="home-container-1">
      <LeftSideBar slideIn={slideIn} />
      <div className="home-container-2">
        <>
          {currentProfile && (
            <section>
              <div className="user-details-container">
                <div className="user-details">
                  <Avatar backgroundColor="purple" color="white" fontSize="50px" px="40px" py="30px">{currentProfile.name.charAt(0).toUpperCase()}</Avatar>
                  <div className="user-name">
                    <h1>{currentProfile?.name}</h1>
                    <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedon).fromNow()}</p>
                  </div>
                </div>
                {currentUser?._id === id && (
                  <button type='button' onClick={() => setSwitch(true)} className="edit-profile-btn">
                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                  </button>
                )}
              </div>
              <>
                {Switch ? (
                  <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                ) : (
                  <ProfileBio currentProfile={currentProfile} />
                )}
              </>
            </section>
          )}
        </>
      </div>
    </div>
  )
}

export default UserProfile