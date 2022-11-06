import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function NodeComponent({ data }) {
    const dispatch = useDispatch();
    const dataStore = useSelector(store => store.data);
    data.segment.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
    })

    return (
        <div className={dataStore.currentNode != data.root ? ("node") : ("node active")}  >
            <div className={dataStore.currentNode != data.root ? ("header") : ("header active")} onClick={() => (dispatch({ type: "SET_CURRENT_NODE", payload: data.root }))}>
                <ion-icon name="radio-button-on"></ion-icon>
                <span>{"Nodo " + data.root.name}</span>
                <span style={{ opacity: '0.5' }}>{"(" + data.root.x + "," + data.root.y + ")"}</span>
            </div>
            <span>Nodos adyacentes</span>
            <div className="nodesList">
                <table>
                    <colgroup span="3"></colgroup>
                    <tr>
                        <th>Id</th>
                        <th>Coord.</th>
                        <th>Peso</th>
                    </tr>
                    {data.segment.map((element, k) => (
                        <tr>
                            <td>{element.name}</td>
                            <td>{"(" + element.x + "," + element.y + ")"}</td>
                            <td>{Math.sqrt(Math.pow((element.x - data.root.x), 2) + Math.pow((element.y - data.root.y), 2)).toFixed(3)}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}
