import React from 'react'
import './rightSideBar.css'
import Widget from './Widget'
import WidgetTag from './WidgetTag'

const RightSideBar = () => {
  return (
    <aside className="right-sidebar">
      <Widget />
      <WidgetTag />
    </aside>
  )
}

export default RightSideBar