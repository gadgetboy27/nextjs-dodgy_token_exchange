const getNextState = (currentState, priceChangePct, buyThreshold, sellThreshold) => {
  if (currentState === 'rising' && priceChangePct >= sellThreshold) {
    return 'sell';
  } else if (currentState === 'falling' && priceChangePct < -buyThreshold) {
    return 'buy';
  } else {
    // Implement Markov's principles to predict the next state
    const probabilityRising = 0.25; // Probability of the price rising
    const probabilityFalling = 0.75; // Probability of the price falling

    if (currentState === 'average') {
      // Use Markov's principles to predict the next state based on the current state
      if (priceChangePct >= 0) {
        return Math.random() < probabilityRising ? 'rising' : 'average';
      } else {
        return Math.random() < probabilityFalling ? 'falling' : 'average';
      }
    } else {
      // If the current state is 'rising' or 'falling', the next state is likely to revert to 'average'
      return 'average';
    }
  }
};

export default getNextState;
