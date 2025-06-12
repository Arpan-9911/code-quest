import React from 'react'
import LeftSideBar from '../../components/leftSideBar/LeftSideBar'
import HomeMainBar from '../../components/homeMainBar/HomeMainBar'
import RightSideBar from '../../components/rightSideBar/RightSideBar'

const Home = ({ slideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSideBar slideIn={slideIn} />
      <div className="home-container-2">
        <HomeMainBar />
        <RightSideBar />
      </div>
    </div>
  )
}

export default Home