import React, { useState, useRef } from 'react';
import './TuringMachineEditor.css';

const TuringMachineEditor = ({ onTMGeneration }) => {
  const tapeInputRef = useRef();
  const stateInputRef = useRef();

  const [states, setStates] = useState(new Set());
  const [initialState, setInitialState] = useState('');
  const [tapeContent, setTapeContent] = useState('');
  const [transitions, setTransitions] = useState([]);
  const [transitionValidationMessage, setTransitionValidationMessage] = useState('');
  const [newTransition, setNewTransition] = useState({
    currentState: '',
    readSymbol: '',
    nextState: '',
    writeSymbol: '',
    moveDirection: ''
  });

  const generateTM = () => {
    onTMGeneration(states, initialState, tapeContent, 0, transitions);
  };

  const addState = () => {
    const s = stateInputRef.current.value.trim();
    if (s === '') {
      return;
    } else {
      setStates(new Set([...states, s]));
    }

    if (initialState === '' || states.size === 0) {
      setInitialState(s);
    }
  };

  const updateTape = () => {
    const content = tapeInputRef.current.value;
    setTapeContent(content.split(' ').join('_'));
  };

  const deleteState = (s) => {
    const updatedStates = new Set([...states].filter((state) => state !== s));
    const updatedTransitions = transitions.filter((t) => t.currentState !== s && t.nextState !== s);
    setStates(updatedStates);
    setTransitions(updatedTransitions);

    if (s === initialState) {
      updatedStates.size > 0 ? setInitialState([...updatedStates][0]) : setInitialState('');
    }
  };

  const addTransition = () => {
    let { isValid, message } = validateTransition(newTransition);
    if (!isValid) {
      setTransitionValidationMessage(message);
    } else {
      setTransitionValidationMessage('');
      setTransitions([...transitions, newTransition]);
    }
  };

  const deleteTransition = (t) => {
    setTransitions([...transitions].filter((transition) => transition !== t));
  };

  const validateTransition = (t) => {
    const { currentState, readSymbol, nextState, writeSymbol, moveDirection } = t;
    if (!states.has(currentState)) {
      return { isValid: false, message: `" ${currentState} " is not a valid state` };
    } else if (!states.has(nextState)) {
      return { isValid: false, message: `" ${nextState} " is not a valid state` };
    } else if (typeof readSymbol !== 'string' || readSymbol.length !== 1) {
      return { isValid: false, message: `Invalid symbol (${readSymbol})` };
    } else if (typeof writeSymbol !== 'string' || writeSymbol.length !== 1) {
      return { isValid: false, message: `Invalid symbol (${writeSymbol})` };
    } else if (moveDirection !== 'L' && moveDirection !== 'R') {
      return { isValid: false, message: `Invalid direction` };
    } else if (
      transitions.some(
        (t) =>
          t.currentState === newTransition.currentState && t.readSymbol === newTransition.readSymbol
      )
    ) {
      return {
        isValid: false,
        message: `Transition already exists (state:${currentState}, symbol:${readSymbol})`
      };
    } else {
      return { isValid: true, message: 'Transition is valid' };
    }
  };

  return (
    <div className='tm-editor'>
      <div className='editor-main'>
      <div className='editor-input-section'>
        <div className='editor-row'>
          <div className='editor-input state-editor'>
            <input
              ref={stateInputRef}
              type='text'
              maxLength={10}
              placeholder='add new state...'
            />
            <button onClick={addState}>add state</button>
          </div>
          <div className='editor-input tape-editor'>
            <input
              type='text'
              ref={tapeInputRef}
              placeholder='new tape content...'
            />
            <button onClick={updateTape}>set tape</button>
          </div>
        </div>

        <div className='editor-input transition-editor'>
          <div className='editor-row'>
            <select
              name='currentState'
              value={newTransition.currentState}
              onChange={(e) => {
                setNewTransition({
                  ...newTransition,
                  [e.target.name]: e.target.value
                });
              }}>
              <option
                value=''
                defaultChecked
                disabled>
                state
              </option>

              {Array.from(states).map((value, index) => (
                <option
                  key={index}
                  value={value}>
                  {value}
                </option>
              ))}
            </select>
            <input
              name='readSymbol'
              type='text'
              value={newTransition.readSymbol}
              onChange={(e) =>
                setNewTransition({
                  ...newTransition,
                  [e.target.name]: e.target.value
                })
              }
              maxLength={1}
              placeholder='symbol'
            />
          </div>

          <span className='arrow' />
          <div className='editor-row'>
          <select
            className='input-width-50'
            name='nextState'
            value={newTransition.nextState}
            onChange={(e) => {
              setNewTransition({
                ...newTransition,
                [e.target.name]: e.target.value
              });
            }}>
            <option
              value=''
              defaultChecked
              disabled>
              next state
            </option>

            {Array.from(states).map((value, index) => (
              <option
                key={index}
                value={value}>
                {value}
              </option>
            ))}
          </select>

          <input
            className='input-width-50'
            name='writeSymbol'
            type='text'
            value={newTransition.writeSymbol}
            onChange={(e) =>
              setNewTransition({
                ...newTransition,
                [e.target.name]: e.target.value
              })
            }
            maxLength={1}
            placeholder='write symbol'
          />
          </div>
          <div className='editor-row'>
          <select
            className='input-width-50'
            name='moveDirection'
            value={newTransition.moveDirection}
            onChange={(e) =>
              setNewTransition({
                ...newTransition,
                [e.target.name]: e.target.value
              })
            }>
            <option
              value=''
              defaultChecked
              disabled>
              tape direction
            </option>

            <option value='L'>Left</option>
            <option value='R'>Right</option>
          </select>
          <button onClick={addTransition}>add transition</button>
          </div>
          <p className='small-text'>{transitionValidationMessage}</p>
        </div>
      </div>
      <div className='editor-display-section'>
        <div className='editor-display tape-display'>
          <p>tape:</p>
          <div className='tape-text'>{tapeContent}</div>
        </div>

        <div className='display-row'>
          <div className='editor-display state-display'>
            <p>states:</p>
            <ul>
              {[...states].map((state, index) => (
                <li key={index}>
                  {state}
                  {state !== initialState ? (
                    <button onClick={() => setInitialState(state)}>set initial</button>
                  ) : (
                    <span>&nbsp;(initial state)</span>
                  )}
                  <button onClick={() => deleteState(state)}>delete</button>
                </li>
              ))}
            </ul>
          </div>

          <div className='editor-display transition-display'>
            <p>transitions:</p>
            <table>
              <thead>
                <tr>
                  <th>State</th>
                  <th>Symbol</th>
                  <th>Next State</th>
                  <th>Next Symbol</th>
                  <th>Tape Direction</th>
                </tr>
              </thead>
              <tbody>
                {transitions.map((transition, index) => (
                  <tr key={index}>
                    <td>{transition.currentState}</td>
                    <td>{transition.readSymbol}</td>
                    <td>{transition.nextState}</td>
                    <td>{transition.writeSymbol}</td>
                    <td>{transition.moveDirection}</td>
                    <button onClick={() => deleteTransition(transition)}>delete</button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      {/* Generate Button */}
      <button className='generate-button' onClick={generateTM}>generate machine</button>
    </div>
  );
};

export default TuringMachineEditor;
