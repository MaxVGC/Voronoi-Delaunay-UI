import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Sidebar() {
    const windowStore = useSelector(store => store.window);
    const dispatch = useDispatch();

    const setWindowActive = (window) => {
        dispatch({
            type: "SET_WINDOW_ACTIVE",
            payload: window
        })
    }

    return (
        <div id="sidebar" className='col'>
            <ul>
                <li className={windowStore.windowActive == "editPoints" ? ('active') : ('')} onClick={() => (windowStore.windowActive == "editPoints" ? (null) : (setWindowActive("editPoints")))} >
                    <ion-icon name="pencil"></ion-icon>
                </li>
                <li className={windowStore.windowActive == "infoPoints" ? ('active') : ('')} onClick={() => (windowStore.windowActive == "infoPoints" ? (null) : (setWindowActive("infoPoints")))}>
                    <ion-icon name="information-circle"></ion-icon>
                </li>
                <li className={windowStore.windowActive == "graph" ? ('active') : ('')} onClick={() => (windowStore.windowActive == "graph" ? (null) : (setWindowActive("graph")))}>
                    <ion-icon name="analytics"></ion-icon>
                </li>
            </ul>
        </div>
    )
}
