import { useState } from 'react';
import TuringMachineUI from './components/turing-machine/TuringMachineUI';
import TuringMachine from './util/turing-core/TuringMachine';

/**
 * The main UI component for the application.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [TM, setTM] = useState(
    new TuringMachine()
  );

  /**
   * Handles the generation of a new Turing Machine.
   *
   * @param {Array} states - The states of the Turing Machine.
   * @param {string} initialState - The initial state of the Turing Machine.
   * @param {string} tapeContent - The content of the tape for the Turing Machine.
   * @param {number} headIndex - The index of the head on the tape for the Turing Machine.
   * @param {Array} transitions - The transitions of the Turing Machine.
   */
  const handleTMGeneration = (states, initialState, tapeContent, headIndex, transitions) => {
    const tm = new TuringMachine(states, initialState, tapeContent, headIndex, transitions);
    setTM(tm);
  };

  /**
   * Handles a single step of the Turing Machine.
   */
  const handleTMStep = () => {
    const stepResult = TM.step();
    if (!stepResult) {
      // alert is used here to avoid the need for a modal or other UI element
      window.alert('WARNING: step failed; undefined transition');
    } else {
      // update the object
      setTM(
        new TuringMachine(
          stepResult.states,
          stepResult.initialState,
          stepResult.tapeContent,
          stepResult.tapeIndex,
          stepResult.transitionFunction
        )
      );
    }
  };

  return (
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
