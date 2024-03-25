export const calculateTotal = (coins, selectedTag) => {
  const total1 = coins.reduce((acc, coin) => acc + Number(coin.marketCap), 0);
  const total2 = coins.reduce((acc, coin) => coin.name !== 'Bitcoin' ? acc + Number(coin.marketCap) : acc, 0);
  const total3 = coins.reduce((acc, coin) => (coin.name !== 'Bitcoin' && coin.name !== 'Ethereum') ? acc + Number(coin.marketCap) : acc, 0);
  const currentTag = coins.reduce((acc, coin) => coin.name === selectedTag ? acc + Number(coin.marketCap) : acc, 0);
  console.log('Totals', total1, total2, total3);
  return {
    total1: total1.toLocaleString(),
    total2: total2.toLocaleString(),
    total3: total3.toLocaleString(),
    currentTag: currentTag.toLocaleString(),
    
  };
};

