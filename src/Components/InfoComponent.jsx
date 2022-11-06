import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import NodeComponent from './NodeComponent';
import PolygonComponent from './PolygonComponent';

export default function InfoComponent() {
    const pointsStore = useSelector(store => store.points);
    const dataStore = useSelector(store => store.data);
    const dispatch = useDispatch();
    const [active, setActive] = useState({
        nodes:true,
        polygons:true
    });

    function randgp(max) { return Math.floor(Math.random() * max) }

    function randhclr() {
        return "#" +
            ("00" + randgp(256).toString(16)).slice(-2) +
            ("00" + randgp(256).toString(16)).slice(-2) +
            ("00" + randgp(256).toString(16)).slice(-2)
    }


    function generate() {
        if (pointsStore.points.length >= 3 && pointsStore.points.length <= 50) {
            generateData().then((res) => {
                res.voronoiPolygons = res.voronoiPolygons.map(obj => ({ ...obj, color: randhclr() }));
                res.voronoiPolygons.sort(function (a, b) {
                    if (a.point.name > b.point.name) {
                        return 1;
                    }
                    if (a.point.name < b.point.name) {
                        return -1;
                    }
                })
                res.delaunaySegments.sort(function (a, b) {
                    if (a.root.name > b.root.name) {
                        return 1;
                    }
                    if (a.root.name < b.root.name) {
                        return -1;
                    }
                })
                dispatch({
                    type: "FETCH_DATA",
                    payload: res
                });
            })
        }
    }

    async function generateData() {
        const location = window.location.hostname;
        const settings = {
            origin: "*",
            method: 'POST',
            body: "{\"points\":" + JSON.stringify(pointsStore.points) + "}"
        };
        const fetchResponse = await fetch(`http://${location}:8080/VoronoiDiagram/webresources/getVoronoiDiagram`, settings);
        const res = fetchResponse.json();
        return res;
    }


    return (
        <div className='InfoComponent'>
            <div className="header" style={{ borderImageSource: "linear-gradient(to left, #FA514A, #BA1E18 )" }}>
                <span className='title'>
                    Datos
                </span>
                <span className='subtitle'>
                    Visualiza los datos de la triangulacion de delunay y diagrama de voronoi generados
                </span>
            </div>
            <div className="headerData">
                <span>Datos generados</span>
                <div className='icon' onClick={() => (dispatch({ type: "SET_DATA_NULL" }))}><ion-icon name="trash"></ion-icon></div>
            </div>
            <div className="infoList" style={dataStore.delaunaySegments == null ? { justifyContent: "center", alignItems: "center" } : {}}>
                {dataStore.delaunaySegments == null ? (
                    <>
                        <div className="emptyData">
                            <ion-icon name="prism"></ion-icon>
                            <span>No hay datos</span>
                            <div className="btn-custom" onClick={() => (generate())}>
                                <span>Generar datos</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="data" onClick={()=>(setActive({...active,nodes:!active.nodes}))}>
                            <span style={{ fontSize: "24px" }}>Nodos</span>
                            {active.nodes?(
                                <ion-icon name="chevron-up-outline"></ion-icon>
                            ):(
                                <ion-icon name="chevron-down-outline"></ion-icon>
                            )}
                        </div>
                        <div  className={active.nodes ? ("nodes active") : ("nodes")}>
                            {dataStore.delaunaySegments.map((e, k) => (
                                <NodeComponent data={e} key={k} />
                            ))}
                        </div>
                        <div className="data" onClick={()=>(setActive({...active,polygons:!active.polygons}))}>
                            <span style={{ fontSize: "24px" }}>Areas</span>
                            {active.polygons?(
                                <ion-icon name="chevron-up-outline"></ion-icon>
                            ):(
                                <ion-icon name="chevron-down-outline"></ion-icon>
                            )}
                        </div>
                        <div  className={active.polygons ? ("polygons active") : ("polygons")}>
                            {dataStore.voronoiPolygons.map((e, k) => (
                                <PolygonComponent data={e} key={k}/>
                            ))}
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}
