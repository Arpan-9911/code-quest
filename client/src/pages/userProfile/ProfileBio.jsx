import React from 'react'

const ProfileBio = ({currentProfile}) => {
  return (
    <div>
      <div>
        {currentProfile?.tags.lenght !== 0 ? (
          <>
            <h4>Tags Watched</h4>
            {currentProfile?.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </>
        ) : (
          <p>No tags watched</p>
        )}
      </div>
      <div>
        {currentProfile?.about ? (
          <>
            <h4>About</h4>
            <p>{currentProfile?.about}</p>
          </>
        ) : (
          <p>No bio Found</p>
        )}
      </div>
    </div>
  )
}

export default ProfileBio