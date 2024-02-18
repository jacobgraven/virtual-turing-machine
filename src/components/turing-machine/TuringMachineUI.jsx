import React from 'react';
import TuringMachineEditor from './editor/TuringMachineEditor';
import TuringMachineDisplay from './display/TuringMachineDisplay';

const TuringMachineUI = ({ tm, onTMStep, onTMGeneration }) => {
  return (
    <div className='tm-app'>
      <TuringMachineEditor onTMGeneration={onTMGeneration} />
      <TuringMachineDisplay
        tm={tm}
        onTMStep={onTMStep}
      />
    </div>
  );
};

export default TuringMachineUI;