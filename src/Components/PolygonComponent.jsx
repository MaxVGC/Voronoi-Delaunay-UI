import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function PolygonComponent({data}) {
    const dispatch = useDispatch();
    const dataStore = useSelector(store => store.data);
    return (
        <div className='polygon' onClick={() => (dispatch({ type: "SET_CURRENT_POLYGON", payload: data.point }))}>
            <div className="color" style={{backgroundColor:(dataStore.currentPolygon==data.point?("#FA514A"):(data.color))}}></div>
            <span>{"Area para el Nodo "+data.point.name}</span>
            <span style={{opacity:"0.5"}}>{"("+data.point.x+","+data.point.y+")"}</span>
        </div>
    )
}
