import { useState } from 'react';
import TuringMachineUI from './components/turing-machine/TuringMachineUI';
import TuringMachine from './util/turing/TuringMachine';

function App() {
  const [TM, setTM] = useState(new TuringMachine());

  const handleTMGeneration = (states, initialState, tapeContent, headIndex, transitions) => {
    const tm = new TuringMachine(states, initialState, tapeContent, headIndex, transitions);
    setTM(tm);
  };

  const handleTMStep = () => {
    const stepResult = TM.step();
    if (!stepResult) {
      console.warn('WARNING: step failed; undefined transition');
    } else {
      setTM(
        new TuringMachine(
          stepResult.Q,
          stepResult.q0,
          stepResult.tapeStr,
          stepResult.tapeIdx,
          stepResult.trTable
        )
      );
    }
  };

  return (
    // <div className='App'>
    //   <TuringMachineEditor
    //     onTMGeneration={handleTMGeneration}
    //   />
    //   <TuringMachineDisplay
    //     tm={TM}
    //     onTMStep={handleTMStep}
    //   />
    // </div>
    <div className='App'>
      <TuringMachineUI
        tm={TM}
        onTMGeneration={handleTMGeneration}
        onTMStep={handleTMStep}
      />
    </div>
  );
}

export default App;
