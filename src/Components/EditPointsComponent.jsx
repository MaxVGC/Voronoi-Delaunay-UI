import React from 'react'
import { useRef } from 'react';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PointComponent from './PointComponent';

export default function EditPointsComponent() {
    const [newPoint, setNewPoint] = useState({
        x: null,
        y: null
    })
    const [update, setUpdate] = useState(true);
    const pointsStore = useSelector(store => store.points);
    const dispatch = useDispatch();
    const inp1 = useRef();
    const inp2 = useRef();

    const addPointD = (newPoint) => {
        if(newPoint.x!=null && newPoint.y!=null){
            dispatch({
                type: "ADD_POINT",
                payload: newPoint
            });
            setNewPoint({
                x: null,
                y: null
            });
            inp1.current.value = "";
            inp2.current.value = "";
        }
    }

    return (
        <div className='EditPointsComponent'>
            <div className="header" style={{ borderImageSource: "linear-gradient(to left, #53aaf9, #1d59b9 )" }}>
                <span className='title'>
                    Editar puntos
                </span>
                <span className='subtitle'>
                    Agrega, elimina o edita puntos.
                </span>
            </div>
            <div className="pointsList">
                <div className="addPoint">
                    <div className="icon" onClick={() => (addPointD(newPoint))}>
                        <ion-icon name="add"></ion-icon>
                    </div>
                    <div className="inputs">
                        <div className="xP">
                            <span>X:</span>
                            <input ref={inp1} type="number" placeholder='...' onChange={e => setNewPoint({ ...newPoint, x: e.target.value })} onKeyPress={(e) => { e.key === "Enter" && (addPointD(newPoint)) }} />
                        </div>
                        <div className="xP">
                            <span>Y:</span>
                            <input ref={inp2} type="number" placeholder='...' onChange={e => setNewPoint({ ...newPoint, y: e.target.value })} onKeyPress={(e) => { e.key === "Enter" && (addPointD(newPoint)) }} />
                        </div>
                    </div>
                </div>
                {pointsStore.points.map((element, key) => (
                    <PointComponent data={element} key={key} position={key} update={update} setUpdate={setUpdate}/>
                ))}
            </div>
        </div>
    )
}
