/**
 * Represents a Turing Machine.
 */
class TuringMachine {
  /**
   * Constructs a Turing Machine instance.
   * @param {string[]} states - The set of states for the Turing Machine.
   * @param {string} initialState - The current/starting state of the Turing Machine.
   * @param {string} tapeContent - The initial content of the tape, as a string.
   * @param {number} tapeIndex - The starting index of the tape.
   * @param {Object} transitionFunction - The table defining the Turing Machine transitions.
   */
  constructor(
    states = [],
    initialState = null,
    tapeContent = '',
    tapeIndex = 0,
    transitionFunction = []
  ) {
    this.states = new Set(states);
    this.currentState = this.states.has(initialState) ? initialState : null;
    this.tape = tapeContent.split('');
    this.tapeIndex = tapeIndex >= 0 && tapeIndex < this.tape.length ? tapeIndex : 0;

    if (Array.isArray(transitionFunction)) {
      this.transitionFunction = new Map();
      this.parseTransitionFunction(transitionFunction);
    } else {
      this.transitionFunction = transitionFunction;
    }
    this.step = this.step.bind(this);
  }

  /**
   * Transforms the transition array from the editor component into a transition map object
   * @param {Array<Array<string>>} func - an array of transition tuples that encodes the transition function.
   */
  parseTransitionFunction(func) {
    func.forEach((tr) => {
      this.parseTransition(...Object.values(tr));
    });
  }

  /**
   * Converts a transition from list form to object form and adds it to the object's transition function
   * @param {string} currentState - the starting state of the transition
   * @param {string} readSymbol - the symbol corresponding to the transition
   * @param {string} nextState - the resulting state of the transition
   * @param {string} writeSymbol - the symbol that is written to the tape
   * @param {string} moveDirection - the direction the tape moves after the transition
   */
  parseTransition(currentState, readSymbol, nextState, writeSymbol, moveDirection) {
    if (!this.states.has(currentState) || !this.states.has(nextState)) {
      return;
    }

    const key = `${currentState},${readSymbol}`;
    if (this.transitionFunction[key]) {
      console.warn(
        `WARNING: replacing existing transition for state '${currentState}' and symbol '${readSymbol}'`
      );
    }

    this.transitionFunction[key] = {
      nextState,
      writeSymbol,
      moveDirection
    };
  }

  /**
   * Reads the symbol at the current position on the tape.
   * @returns {string} The symbol currently at the tape head.
   */
  readSymbol() {
    return this.tape[this.tapeIndex];
  }

  /**
   * Writes a symbol at the current position on the tape.
   * @param {string} symbol - The symbol to be written to the tape head.
   */
  writeSymbol(symbol) {
    this.tape[this.tapeIndex] = symbol;
  }

  /**
   * Moves the head of the tape in the specified direction.
   * @param {'L'|'R'} direction - The direction to move the tape (left or right)
   */
  moveTape(direction) {
    if (direction === 'L') {
      this.tapeIndex = Math.max(0, this.tapeIndex - 1);
    } else if (direction === 'R') {
      this.tapeIndex = Math.min(this.tape.length - 1, this.tapeIndex + 1);
    }
  }

  /**
   * Performs a single computation (or step) for the current machine configuration and returns the next configuration.
   * @returns {Object} the object defining paramteres for the machine post-computation
   */
  step() {
    const currentSymbol = this.readSymbol();
    const transitionKey = `${this.currentState},${currentSymbol}`;
    const transition = this.transitionFunction[transitionKey];
    if (!transition) {
      return undefined;
    } else {
      this.writeSymbol(transition.writeSymbol);
      this.moveTape(transition.moveDirection);

      let newCurr = transition.nextState;
      let newIdx = this.tapeIndex;
      // Next TM Instance: TuringMachine(stateSet, initialState, tapeContent, tapeIndex, transitionFunction)
      return {
        states: this.states,
        initialState: newCurr,
        tapeContent: this.tape.join(''),
        tapeIndex: newIdx,
        transitionFunction: this.transitionFunction
      };
    }
  }
}

export default TuringMachine;
