import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import { Stage, Layer, Circle, Line, Group, Label, Text } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';

export default function Canvas({ eleContainer }) {
  const canvas = useRef();
  const [stageSize, setstageSize] = useState({
    width: 1,
    height: 1
  });
  const pointsStore = useSelector(store => store.points);
  const dataStore = useSelector(store => store.data);
  const dispatch = useDispatch();

  const [stage, setStage] = useState({
    scale: 100,
    y: 1,
    x: 1
  });

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStage({
      scale: newScale,
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale
    });
  };

  function fitStage(stage) {
    console.log(stage)
  }




  useEffect(() => {
    setstageSize({
      width: eleContainer.current.offsetWidth,
      height: eleContainer.current.offsetHeight
    })
    setStage(({
      scale: 100,
      y: eleContainer.current.offsetHeight / 2,
      x: eleContainer.current.offsetWidth / 2
    }))
  }, [])

  window.addEventListener('resize', function (event) {
    setstageSize({
      width: eleContainer.current.offsetWidth,
      height: eleContainer.current.offsetHeight
    })
  }, true);


  return (
    <div id='canvas'>
      <Stage width={stageSize.width} onWheel={handleWheel} height={stageSize.height} draggable={true} scaleX={stage.scale} scaleY={-1 * stage.scale} x={stage.x} y={stage.y} onDblClick={(e) => (fitStage(e.currentTarget))}>
        {dataStore.voronoiPolygons == null || dataStore.isVisibleVoronoi == false ? (null) : (
          <Layer>
            {dataStore.voronoiPolygons.map((element, key) => {
              var aux = [];
              element.vertexs.map((e) => {
                aux.push(e.x);
                aux.push(e.y);
              });
              return <Line points={aux} fill={dataStore.currentPolygon?.x == element.point.x && dataStore.currentPolygon?.y == element.point.y ? ("#FA514A") : (element.color)} closed="true" strokeWidth={0.06} stroke={element.color+""} />
            })}
          </Layer>
        )}
        {dataStore.delaunaySegments == null || dataStore.isVisibleDelaunay == false ? (null) : (
          <Layer>
            {dataStore.delaunaySegments.map((element, key) => (
              element.segment.map((ele2) => (
                <Line points={[element.root.x, element.root.y, ele2.x, ele2.y]} fill="red" stroke="#ffffff26" strokeWidth={0.01} />
              ))
            ))}
          </Layer>
        )}
        {dataStore.pathDijkstra == null ? (null) : (
          <Layer>
            {dataStore.pathDijkstra.mostShortPath.map((element, key) => {
              return <Line points={[element.from.x, element.from.y, element.to.x, element.to.y]} fill="#2BBA44" stroke="#2BBA44" strokeWidth={0.03} />
            })}
          </Layer>
        )}
        <Layer>
          {pointsStore.points.map((element, key) => {
            return <Group>
              <Circle key={key} x={element.x} y={element.y} radius={10 / stage.scale} stroke={"#188bba"} strokeWidth={0.02} fill={dataStore.currentNode?.x == element.x && dataStore.currentNode?.y == element.y ? ("#BA1E18") : ("#1d59b9")} />
              <Label x={element.x} y={element.y}>
                {dataStore?.delaunaySegments?.map((ele) => {
                  if (ele.root.x == element.x && ele.root.y == element.y) {
                    return <Text text={ele.root.name} fill="#ffffff" fontSize={0.2} scaleY={-1} draggable={true} />
                  }
                })}
              </Label>
            </Group>
          })}
        </Layer>
      </Stage>
      <div id="btn-home" onClick={() => { setStage({ scale: 100, x: (eleContainer.current.offsetWidth / 2), y: (eleContainer.current.offsetHeight / 2) }) }}><ion-icon name="home"></ion-icon></div>
      <div id="btn-voronoi" className={dataStore.isVisibleVoronoi ? ('active') : ('')} onClick={() => (dispatch({ type: "TOOGLE_VISIBLE", payload: "voronoi" }))}><ion-icon name="prism"></ion-icon></div>
      <div id="btn-delaunay" className={dataStore.isVisibleDelaunay ? ('active') : ('')} onClick={() => (dispatch({ type: "TOOGLE_VISIBLE", payload: "delaunay" }))}><ion-icon name="analytics"></ion-icon></div>

    </div>
  )
}
