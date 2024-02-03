
/**
 * Generates a set of nodes and edges that can be used for visualization of a Turing machine's functionality.
 * The data is constructed from the transition function, the set of states, and the current state.
 *
 * @param {Object} transitionFunction - The transition function containing state transitions.
 * @param {Array} states - The array of states.
 * @param {string} currState - The current state.
 * @returns {Object} - An object containing nodes and edges for the graph.
 */
export const getGraphData = (transitionFunction, states, currState) => {
  let nodes = [];
  let edges = [];

  // Generate a graph node for each state
  states.forEach((s) => {
    nodes.push({ id: s, label: `${s}`, color: s === currState ? '#00ff55' : '#fea09c' });
  });

  // Generate edges based on the transition function
  // Edges are labeled in the form "readSymbol->writeSymbol, moveDirection"
  Object.entries(transitionFunction).forEach(([key, value]) => {
    // Each transition in transitionFunction is a key-value pair
    // keys contain the state and the symbol that must be read to trigger the transition
    // each value is an object containing the nextState, writeSymbol, and moveDirection (for the tape)
    // Parse the data from the KV pair and add a directed edge connecting the proper states
    const [currentState, readSymbol] = key.split(',');
    const { nextState, writeSymbol, moveDirection } = value;

    // Add each edge to the graph
    // Note that edge labels are formatted as "readSymbol->writeSymbol, moveDirection" and
    // the states corresponding to the transition are used as the edge's source and target
    edges.push({
      from: currentState,
      to: nextState,
      label: `${readSymbol}-->${writeSymbol},${moveDirection} \n`,
      arrows: 'to'
    });
  });

  return { nodes, edges };
};
