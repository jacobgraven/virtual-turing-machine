import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import { getGraphData } from '../../../util/helpers';
// import './TuringMachineDisplay.css';

const TuringMachineDisplay = ({ tm, onTMStep }) => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const graphOptions = {
    autoResize: false,
    // minHeight: '500px',
    width: '100%',
    layout: {
      hierarchical: true
    },
    edges: {
      color: '#000000',
      smooth: true,
      

      spacingFactor: 1.5 // increase edge

    },
    physics: {
      stabilization: {
        iterations: 200,
      },
      barnesHut: {
        gravitationalConstant: -30000,
        springConstant: 0.04,
        springLength: 95
      }
    },
    interaction: {
      dragNodes: true,
      zoomView: true,
      dragView: true,
      // minZoom: 0.1,
      // maxZoom: 10
    }
  };
  useEffect(() => {
    const { nodes, edges } = getGraphData(tm.transitionFunction, tm.states, tm.currentState);
    setGraphData({ nodes, edges });
  }, [tm]);

  return (
    <div className='tm-display'>
      {/* Displays: state set and current state of the machine currently loaded into the component */}
      <div className='display-section state-display'>
        <div className='state-set large-text'>
          <span className='italic-text'>set of states:</span>
          <span>
            &nbsp; <span className='larger-text'>[</span> &nbsp; {Array.from(tm.states).join(', ')}{' '}
            &nbsp; <span className='larger-text'>]</span> &nbsp;
          </span>
        </div>
        <div className='state-current large-text'>
          <span className='italic-text'>current state: &nbsp;</span>
          <span>{tm.currentState}</span>
        </div>
      </div>
      {/* Displays: current tape content (the characters currently printed on the tape cells) */}
      <div className='tape-display'>
        {tm.tape.map((symbol, index) => (
          <div
            className={index === tm.tapeIndex ? 'tape-cell current' : 'tape-cell'}
            key={index}>
            <p
              className='small-text'
              style={{
                width: 'clamp(0.4rem, 2.0193vw + 0.14rem, 2.3rem)',
                textAlign: 'center'
              }}>
              {symbol}
            </p>
          </div>
        ))}
      </div>
      <button
        className='base-btn'
        onClick={onTMStep}>
        compute step
      </button>
      {/* Displays: state diagram (highlights the current state and shows transition behavior) */}
      <div className='state-diagram'>
        <Graph
          graph={graphData}
          options={graphOptions}
          // options={{
          //   layout: { hierarchical: false },
          //   edges: { color: '#000000' },
          //   width: '100%',
          //   height: '100%'
          // }}
        />
      </div>
    </div>
  );
};

export default TuringMachineDisplay;
