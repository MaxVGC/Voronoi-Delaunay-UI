import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

export default function GraphComponent() {

    const dataStore = useSelector(store => store.data);
    const [valueSelects, setvalueSelects] = useState({
        select1: null,
        select2: null
    })

    return (
        <div className='GraphComponent'>
            <div className="header" style={{ borderImageSource: "linear-gradient(to left, #64FA7D, #2BBA44 )" }}>
                <span className='title'>
                    Algoritmo de Dijkstra
                </span>
                <span className='subtitle'>
                    Visualiza el camino mas corto entre 2 nodos.
                </span>
            </div>
            {dataStore.delaunaySegments == null ? (
                <>
                    <div className="emptyData">
                        <ion-icon name="analytics"></ion-icon>
                        <span>No hay datos</span>
                        <span style={{fontSize:"14px"}}>Generalos en la pestaña datos</span>
                    </div>
                </>
            ) : (
                <div className="inputNodes">
                    <div className="inputs">
                        <div className="xP">
                            <span>A:</span>
                            <select name="select" onChange={(e) => { e.target.selectedIndex == 0 ? (setvalueSelects({ ...valueSelects, select1: null })) : (setvalueSelects({ ...valueSelects, select1: dataStore.delaunaySegments[e.target.selectedIndex - 1].root })) }} >
                                <option defaultValue={null}>...</option>
                                {dataStore.delaunaySegments.map((element, key) => (
                                    <option value={element.root} disabled={element.root == valueSelects.select2}>{element.root.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="xP">
                            <span>B:</span>
                            <select name="select" onChange={(e) => { e.target.selectedIndex == 0 ? (setvalueSelects({ ...valueSelects, select2: null })) : (setvalueSelects({ ...valueSelects, select2: dataStore.delaunaySegments[e.target.selectedIndex - 1].root })) }} >
                                <option defaultValue={null}>...</option>
                                {dataStore.delaunaySegments.map((element, key) => (
                                    <option value={key} disabled={element.root == valueSelects.select1}>{element.root.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="icon" onClick={() => { }}>
                        <ion-icon name="search"></ion-icon>
                    </div>
                </div>
            )}

        </div>
    )
}

