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
  // edges are labeled in the form "readSymbol->writeSymbol, moveDirection"
  Object.entries(transitionFunction).forEach(([key, value]) => {
    // key value pairs represent transitions
    // keys contain the state and the symbol to be read for that transition
    // values are objects containing: nextState, writeSymbol, and moveDirection (tape head movement)

    // Parse the data from the KV pair and add a directed edge connecting the proper states
    const [currentState, readSymbol] = key.split(',');
    const { nextState, writeSymbol, moveDirection } = value;

    // Add each edge to the graph. Edge labels are displayed as "readSymbol->writeSymbol, moveDirection"
    // the states correspond to the source and target nodes for that edge.
    const edgeIndex = edges.findIndex((e) => e.from === currentState && e.to === nextState);

    if (edgeIndex !== -1) {
      edges[edgeIndex].label += `\n\n ${readSymbol} → ${writeSymbol},${moveDirection}`;
    } else {
      edges.push({
        from: currentState,
        to: nextState,
        label: `${readSymbol} → ${writeSymbol}, ${moveDirection}`,
        arrows: 'to',
      });
    }
  });

  return { nodes, edges };
};
