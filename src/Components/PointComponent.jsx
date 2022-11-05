import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function PointComponent({ data, position,update,setUpdate }) {
  const dispatch = useDispatch();

  const removePoint = () => {
    dispatch({
      type: "REMOVE_POINT",
      payload: position
    });
    setUpdate(!update);
  }

  return (
    <div className='point'>
      <div className="content">
        <div className="coord">
          <span className='label' style={{ color: "#1d59b9" }}>
            X
          </span>
          <span >
            {data.x}
          </span>
        </div>
        <div className="coord">
          <span className='label' style={{ color: "#BD1521" }}>
            Y
          </span>
          <span >
            {data.y}
          </span>
        </div>
      </div>
      <div className="closeBtn"  onClick={() => (removePoint())}>
        <ion-icon name="close"></ion-icon>
      </div>
    </div>
  )
}