import React from 'react'

import './style.css';

const ClassBox = ({ classData, showOptions = false, handleDelete = () => null, handleUpdate = () => null }) => {

  const onDeleteClick = () => {
    if (window.confirm("Are you sure you sure?")) {
      console.log("DELETING!!!");
      handleDelete();
    }
  }

  const onUpdateClick = () => {
    handleUpdate();
  }

  return (
    <div className="cac_class-box" >
      <span className="cac_class-box_title">{classData.title}</span>
      <span className="cac_class-box_date">
        {classData.date.toDate().toDateString()}
      </span>
      <span className="cac_class-box_code">{classData.code}</span>
      <p className="cac_class-box_description">
        {classData.description}
      </p>
      <span className="cac_class-box_counter">
        {classData.attendances.length} attendants
      </span>
      {showOptions && (
        <div className="cac_class-box_options">
          <span className="cac_class-box_option" onClick={onUpdateClick}>Update</span>
          <span> | </span>
          <span className="cac_class-box_option" onClick={onDeleteClick}>Delete</span>
        </div>
      )}
    </div>
  )
}

export default ClassBox;