import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

export default function GraphComponent() {
    const dispatch = useDispatch();

    const dataStore = useSelector(store => store.data);
    const [valueSelects, setvalueSelects] = useState({
        select1: null,
        select2: null
    })

    async function getPathDijkstra() {
        const location = window.location.hostname;
        const settings = {
            origin: "*",
            method: 'POST',
            body: "{\"segments\":" + JSON.stringify({ nodes: dataStore.delaunaySegments, from: valueSelects.select1, to: valueSelects.select2 }) + "}"
        };
        const fetchResponse = await fetch(`http://${location}:8080/VoronoiDiagram/webresources/getDijkstraAlgorithm`, settings);
        const res = fetchResponse.json();
        return res;
    }

    function executeDijkstraAlgorithm() {
        getPathDijkstra().then((res) => {
            dispatch({
                type: "SET_PATH_DIJKSTRA",
                payload: res
            });
        })
    }

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
                        <span style={{ fontSize: "14px" }}>Generalos en la pestaña datos</span>
                    </div>
                </>
            ) : (
                <>
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
                        <div className="icon" onClick={() => { executeDijkstraAlgorithm() }}>
                            <ion-icon name="search"></ion-icon>
                        </div>
                    </div>
                    {dataStore.pathDijkstra == null ? (null) : (
                        <>
                        <div className="totalDistance">
                            <span className='label'>Distancia total</span>
                            <span className='number'>{dataStore.pathDijkstra.totalDistance.toFixed(3)}</span>
                        </div>
                            <div className="divPathInfo">
                                {dataStore.pathDijkstra.mostShortPath.map((element, key) => (
                                    <div className="cardPathInfo">
                                        <div className="header">
                                            Iteracion {key}
                                        </div>
                                        <div className="infoPath">
                                            <div className="box">
                                                <span className="name">{element.from.name}</span>
                                                <span className="label">Nodo</span>
                                            </div>
                                            <div className="box">
                                                <ion-icon name="arrow-forward-outline"></ion-icon>
                                                <span className="distance">{element.distance.toFixed(3)}</span>
                                            </div>
                                            <div className="box">
                                                <span className="name">{element.to.name}</span>
                                                <span className="label">Nodo</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}

        </div>
    )
}

