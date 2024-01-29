import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';

import './TuringMachineDisplay.css';
import { transformToGraphData } from '../../../util/helpers';

const TuringMachineDisplay = ({ tm, onTMStep }) => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  useEffect(() => {
    const { nodes, edges } = transformToGraphData(tm.transitionFunction, tm.currentState);
    setGraphData({ nodes, edges });
  }, [tm]);

  return (
    <div className='tm-display'>
      <div className='display-section state-display'>
        <div className='state-set large-text'>
          <span className='italic-text'>set of states:</span>
          <span className='bold-text'>&nbsp; [ {Array.from(tm.states).join(', ')} ]</span>
        </div>
        <div className='state-current large-text'>
          <span className='italic-text'>current state: &nbsp;</span>
          <span className='bold-text'>{tm.currentState}</span>
        </div>
      </div>
      <div className='tape-display'>
        {tm.tape.map((symbol, index) => (
          <div
            className={index === tm.tapeIndex ? 'tape-cell current' : 'tape-cell'}
            key={index}>
            <p
              className='small-text bold-text'
              style={{
                width: 'clamp(0.4rem, 2.0193vw + 0.14rem, 2.3rem)',
                // height: 'auto',
                textAlign: 'center'
              }}>
              {symbol}
            </p>
          </div>
        ))}
      </div>
      <button onClick={onTMStep}>compute step</button>
        <Graph
          graph={graphData}
          options={{
            layout: { hierarchical: false },
            edges: { color: '#000000' },
            // height: '500px'
          }}
        />
    </div>
  );
};

export default TuringMachineDisplay;
