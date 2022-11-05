import React from 'react'
import Canvas from './Components/Canvas'
import Sidebar from './Components/Sidebar'
import { useSelector, useDispatch } from 'react-redux'
import EditPointsComponent from './Components/EditPointsComponent'
import InfoComponent from './Components/InfoComponent'
import { useRef } from 'react'
export default function App() {
  const windowStore = useSelector(store => store.window);
  const canvaContainer = useRef();

  return (
    <>
      <Sidebar />
      <div className="main-container" style={{ height: "100vh", margin: 0, padding: 0 }}>
        <div className="row">
          <div className="col-md-3 table-column">
            {windowStore.windowActive == 'editPoints' && (<EditPointsComponent />)}
            {windowStore.windowActive == 'infoPoints' && (<InfoComponent />)}
          </div>
          <div id="canvaContainer" ref={canvaContainer} className="col-md-9 canvaContainer" style={{ margin: 0, padding: 0 }}>
            <Canvas eleContainer={canvaContainer} />
          </div>
        </div>
      </div>
    </>

  )
}
