import React from 'react'

function SidebarCard({
  updateAt,
  jobTitle,
  location,
  i
}) {
  return (
    <div 
    className={`sidebar-card-container ${i==2&& `sidebar-card-container-selected`} `}
    >
      <div>{updateAt}</div>
      <div>{jobTitle}</div>
      <div>{location}</div>
      <hr></hr>
    </div>
  )
}

export default SidebarCard