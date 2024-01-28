import React, { useState, useEffect } from "react";
import TuringMachineEditor from "./editor/TuringMachineEditor";
import TuringMachineDisplay from "./display/TuringMachineDisplay";

const TuringMachine = ({tm, onTMStep, onTMGenerate}) => {
    const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
    const editorRef = useRef();
    // useEffect(() => {
    //     const { nodes, edges } = transformToGraphData(tm.transitionFunction, tm.currentState);
    //     setGraphData({ nodes, edges });
    // }, [tm]);

    const handleTMGeneration = () => {
        onTMGenerate(editorRef.current.states, editorRef.current.initialState, editorRef.current.tapeContent, 0, editorRef.current.transitions)
    }
    return (
        <div className="tm-app">
        <TuringMachineEditor ref={editorRef}/>
        <button onClick={handleTMGeneration}></button>
        <TuringMachineDisplay
            tm={tm}
            onTMStep={onTMStep}
        />
        </div>
    )
}