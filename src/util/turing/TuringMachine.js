/**
 * Represents a Turing Machine.
 */
class TuringMachine {
  /**
   * Constructs a Turing Machine instance.
   * @param {string[]} states - The set of states for the Turing Machine.
   * @param {string} initialState - The current/starting state of the Turing Machine.
   * @param {string} tapeContent - The initial content of the tape
   * @param {number} tapeIndex - The starting index of the tape
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
      // this.transitionArray = transitionFunction;
      this.transitionFunction = new Map();
      this.parseTransitionFunction(transitionFunction);
    } else {
      this.transitionFunction = transitionFunction;
    }
    this.step = this.step.bind(this);
  }

  /**
   * Transforms the transition array from the editor component into a transition map object
   * @param {Array<Array<string>>} func - the array of transition data, which is stored as length 5 arrays
   */
  parseTransitionFunction(func) {
    func.forEach((tr) => {
      this.parseTransition(...Object.values(tr));
    });
  }

  /**
   * Converts a transition from list form to object form and adds it to the object's transition function
   * @param {string} currentState -
   * @param {string} readSymbol -
   * @param {string} nextState -
   * @param {string} writeSymbol -
   * @param {string} moveDirection -
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
   * @param {'L'|'R'} direction - The direction to move the tape ('L' for left, 'R' for right).
   */
  moveTape(direction) {
    if (direction === 'L') {
      this.tapeIndex = Math.max(0, this.tapeIndex - 1);
    } else if (direction === 'R') {
      this.tapeIndex = Math.min(this.tape.length - 1, this.tapeIndex + 1);
    }
  }

  /**
   * Performs a step computation with the current machine configuration and returns parameters
   * for the next machine state
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
      // Next TM Obj: Q, q0, tapeStr, tapeIdx, trTable
      return {
        Q: this.states,
        q0: newCurr,
        tapeStr: this.tape.join(''),
        tapeIdx: newIdx,
        trTable: this.transitionFunction
      };
    }
  }
}

export default TuringMachine;
