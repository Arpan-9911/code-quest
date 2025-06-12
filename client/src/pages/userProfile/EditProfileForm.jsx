import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../action/users';

const EditProfileForm = ({ currentUser, setSwitch }) => {
  const [name, setName] = useState(currentUser?.name);
  const [about, setAbout] = useState(currentUser?.about);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  // console.log(currentUser?.result);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(tags[0] == '' || tags.length === 0){
      alert('Update tags fields.');
    }
    else{
      dispatch(updateProfile(currentUser?._id, { name, about, tags }));
    }
    setSwitch(false);
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display Name</h3>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About Me</h3>
          <textarea
            id="about"
            value={about ?? ""}
            onChange={(e) => setAbout(e.target.value)}
            cols="30"
            rows="10"
          >
          </textarea>
        </label>
        <label htmlFor="tags">
          <h3>Tags</h3>
          <input
            type="text"
            id="tags"
            onChange={(e) => setTags(e.target.value.split(' '))}
          />
        </label>
        <br/>
        <button type="submit" className='user-submit-btn'>Save Profile</button>
        <button type="button" className='user-cancel-btn' onClick={() => setSwitch(false)}>Cancel</button>
      </form>
    </div>
  )
}

export default EditProfileForm