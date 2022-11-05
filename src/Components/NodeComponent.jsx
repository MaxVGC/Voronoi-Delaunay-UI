import React from 'react'
import { useDispatch,useSelector } from 'react-redux'

export default function NodeComponent({ data }) {
    const dispatch = useDispatch();
    const dataStore = useSelector(store => store.data);

    return (
        <div className="node" onClick={()=>(dispatch({type: "SET_CURRENT_NODE",payload: data.root}))} >
            <div className={dataStore.currentNode!=data.root?("header"):("header active")}>
                <ion-icon name="radio-button-on"></ion-icon>
                <span>{"Nodo "+data.name+" ("+data.root.x+","+data.root.y+")"}</span>
            </div>
            
        </div>
    )
}
