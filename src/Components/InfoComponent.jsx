import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NodeComponent from './NodeComponent';

export default function InfoComponent() {
    const pointsStore = useSelector(store => store.points);
    const dataStore = useSelector(store => store.data);
    const dispatch = useDispatch();

    function randgp(max) { return Math.floor(Math.random() * max) }

    function randhclr() {
        return "#" +
            ("00" + randgp(256).toString(16)).slice(-2) +
            ("00" + randgp(256).toString(16)).slice(-2) +
            ("00" + randgp(256).toString(16)).slice(-2)
    }


    function generate() {
        if (pointsStore.points.length >= 3) {
            generateData().then((res) => {
                res.voronoiPolygons = res.voronoiPolygons.map(obj => ({ ...obj, color: randhclr() }));
                res.delaunaySegments = res.delaunaySegments.map((obj, n) => {
                    const letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                    var k = n % 26;
                    var j = Math.floor(n / 26) - 1;
                    var aux = "";
                    for (let i = -1; i < j; i++) {
                        aux = aux + letter[j];
                    }
                    aux = aux + letter[k];
                    return ({...obj,name:aux})
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
                        <div className="headerData">
                            <span>Datos generados</span>
                            <div className='icon' onClick={() => (dispatch({ type: "SET_DATA_NULL" }))}><ion-icon name="trash"></ion-icon></div>
                        </div>
                        <div className="statistics">

                        </div>
                        <div className="data">
                            <span style={{ fontSize: "24px" }}>Nodos</span>
                        </div>
                        <div className="nodes">
                            {dataStore.delaunaySegments.map((e, k) => (
                                <NodeComponent data={e} key={k} />
                            ))}
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}
