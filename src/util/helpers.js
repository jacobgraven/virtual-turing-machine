export const transformToGraphData = (transitionFunction, machineState) => {
  let nodes = [];
  let nodesTracker = new Set();
  let edges = [];
  Object.entries(transitionFunction).forEach(([key, value]) => {
    const [currentState, readSymbol] = key.split(',');
    const { nextState, writeSymbol, moveDirection } = value;

    if (!nodesTracker.has(currentState)) {
      nodesTracker.add(currentState);
      nodes.push({ id: currentState, label: `${currentState}`, color: (currentState === machineState) ? '#00ff55' : '#fea09c' });
    }

    if (!nodesTracker.has(nextState)) {
      nodesTracker.add(nextState);
      nodes.push({ id: nextState, label: `${nextState}`, color: (nextState === machineState) ? '#00ff55' : '#fea09c' });
    }

    edges.push({
      from: currentState,
      to: nextState,
      label: `${readSymbol}->${writeSymbol}, ${moveDirection}`,
      arrows: 'to'
    });
  });
  return { nodes, edges };
};

// export const getGraphdata = (transitionFunction, states, currState) => {
//   return undefined;
// }