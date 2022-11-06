import React from 'react'

export default function GraphComponent() {
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
        </div>
    )
}

