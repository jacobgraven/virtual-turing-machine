import React, { useState, useRef } from 'react';
// import './TuringMachineEditor.css';

const TuringMachineEditor = ({ onTMGeneration }) => {
  const tapeInputRef = useRef();
  const stateInputRef = useRef();
  const trInputCurrStateRef = useRef();
  const trInputNextStateRef = useRef();

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
    }

    setStates(new Set([...states, s]));
    stateInputRef.current.value = '';

    if (initialState === '' || states.size === 0) {
      setInitialState(s);
    }
  };

  const updateTape = () => {
    const content = tapeInputRef.current.value;
    setTapeContent(content.split(' ').join('_'));
    tapeInputRef.current.value = '';
  };

  const deleteState = (s) => {
    const updatedStates = new Set([...states].filter((state) => state !== s));
    const updatedTransitions = transitions.filter((t) => t.currentState !== s && t.nextState !== s);

    let newCurrState = newTransition.currentState;
    let newNextState = newTransition.nextState;

    if (s === newTransition.currentState) {
      newCurrState = [...updatedStates][0] || '';
      trInputCurrStateRef.current.value = newCurrState;
    }

    if (s === newTransition.nextState) {
      newNextState = [...updatedStates][0] || '';
      trInputNextStateRef.current.value = newNextState;
    }

    if (s === initialState) {
      setInitialState([...updatedStates][0] || '');
    }

    setNewTransition({ ...newTransition, currentState: newCurrState, nextState: newNextState });
    setStates(updatedStates);
    setTransitions(updatedTransitions);
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
      return {
        isValid: false,
        message: `" ${currentState} " is not a valid state`
      };
    } else if (!states.has(nextState)) {
      return {
        isValid: false,
        message: `" ${nextState} " is not a valid state`
      };
    } else if (typeof readSymbol !== 'string' || readSymbol.length !== 1) {
      return {
        isValid: false,
        message: `Invalid symbol (${readSymbol})`
      };
    } else if (typeof writeSymbol !== 'string' || writeSymbol.length !== 1) {
      return {
        isValid: false,
        message: `Invalid symbol (${writeSymbol})`
      };
    } else if (moveDirection !== 'L' && moveDirection !== 'R') {
      return {
        isValid: false,
        message: `Invalid direction`
      };
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
      return {
        isValid: true,
        message: 'Transition is valid'
      };
    }
  };

  return (
    <div className='tm-editor'>
      <div className='input-section'>
        <div className='flex-group'>
          <div className='input-state'>
            <input
              className='base-input'
              ref={stateInputRef}
              type='text'
              maxLength={5}
              placeholder='add states here...'
            />
            <button
              className='btn-width-max base-btn'
              onClick={addState}>
              ADD STATE
            </button>
          </div>
          <div className='input-tape'>
            <input
              className='base-input'
              type='text'
              ref={tapeInputRef}
              placeholder='edit tape here...'
            />
            <button
              className='btn-width-max base-btn'
              onClick={updateTape}>
              SET TAPE
            </button>
          </div>
        </div>

        <div className='editor-input input-transition'>
          <div className='flex-group'>
            <select
              className='base-select'
              name='currentState'
              ref={trInputCurrStateRef}
              value={newTransition.currentState}
              onChange={(e) => {
                setNewTransition({
                  ...newTransition,
                  [e.target.name]: e.target.value
                });
              }}>
              <option
                className='base-option'
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
              className='base-input'
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

          <span className='large-text'>&#8594;</span>

          <div className='row-collection'>
            <div className='flex-group'>
              <select
                className='base-select'
                name='nextState'
                ref={trInputNextStateRef}
                value={newTransition.nextState}
                onChange={(e) => {
                  setNewTransition({
                    ...newTransition,
                    [e.target.name]: e.target.value
                  });
                }}>
                <option
                  className='base-option'
                  value=''
                  defaultChecked
                  disabled>
                  next state
                </option>

                {Array.from(states).map((value, index) => (
                  <option
                    className='base-option'
                    key={index}
                    value={value}>
                    {value}
                  </option>
                ))}
              </select>

              <input
                className='base-input'
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
            <select
              className='base-select'
              name='moveDirection'
              value={newTransition.moveDirection}
              onChange={(e) =>
                setNewTransition({
                  ...newTransition,
                  [e.target.name]: e.target.value
                })
              }>
              <option
                className='base-option'
                value=''
                defaultChecked
                disabled>
                tape direction
              </option>

              <option value='L'>Left</option>
              <option value='R'>Right</option>
            </select>
            <button
              className='btn-width-max base-btn'
              onClick={addTransition}
            >
              ADD TRANSITION
            </button>
            <p
              className='small-text'
              style={{ textAlign: 'center' }}>
              {transitionValidationMessage}
            </p>
          </div>
        </div>
      </div>

      <div className='display-section'>
        <div className='editor-display-tape'>
          <h2>TAPE</h2>
          <div className='tape-text'>{tapeContent}</div>
        </div>

        <div className='display-group'>
          <div className='editor-display-state'>
            <h2>STATES</h2>
            <div className='state-table-wrapper'>
              <table className='state-table base-table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>State</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(states).map((state, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{state}</td>
                      <td>
                        {state !== initialState ? (
                          <button
                            className='small-text base-btn'
                            onClick={() => setInitialState(state)}>
                            Initial&#x2610;
                          </button>
                        ) : (
                          <button className='small-text color-selected base-btn'>
                            Initial &#x2611;
                          </button>
                        )}
                      </td>
                      <td style={{ border: 'none' }}>
                        <button
                          className='btn-width-max small-text base-btn'
                          onClick={() => deleteState(state)}>
                          &#10060;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className='editor-display-transitions transition-display'>
            <h2>TRANSITIONS</h2>
            <div className='transition-table-wrapper'>
              <table className='transition-table base-table'>
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Symbol</th>
                    <th>Next State</th>
                    <th>Write Symbol</th>
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
                      <button className='base-btn' onClick={() => deleteTransition(transition)}> &#10060;</button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='editor-generate-button'>
        <button
          className='generate-button base-btn'
          onClick={generateTM}>
          generate machine
        </button>
      </div>
    </div>
  );
};

export default TuringMachineEditor;
