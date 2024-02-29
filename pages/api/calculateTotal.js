export const calculateTotal = (coins, selectedTag) => {
  console.log('Selected Tag', selectedTag);

  const total1 = coins.reduce((acc, coin) => acc + Number(coin.marketCap), 0);
  console.log('Total 1:', total1);

  const total2 = coins.reduce((acc, coin) => {
    if (coin.name !== 'Bitcoin') {
      acc += Number(coin.marketCap);
    }
    return acc;
  }, 0);

  console.log('Total 2:', total2);

  const total3 = coins.reduce((acc, coin) => {
    if (coin.name !== 'Bitcoin' && coin.name !== 'Ethereum') {
      acc += Number(coin.marketCap);
    }
    return acc;
  }, 0);

  console.log('Total 3:', total3);

  const currentTag = coins.reduce((acc, coin) => {
    if (coin.name === selectedTag) {
      acc += Number(coin.marketCap);
    }
    return acc;
  }, 0);

  console.log('Current Tag:', currentTag);

  return {
    total1: total1.toLocaleString(),
    total2: total2.toLocaleString(),
    total3: total3.toLocaleString(),
    currentTag: currentTag.toLocaleString(),
  };
};
