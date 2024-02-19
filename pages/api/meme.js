// pages/api/uniswapTrader

export default async function handler(req, res) {
  try {
    const options = {
      headers: {
        'x-access-token': 'coinranking1ec14607e402eb7db2596b66588dfc0ce83161ca27f93649',
      },
    };

    const response = await fetch('https://api.coinranking.com/v2/coins?tags[]=meme', options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    // Extract relevant data and send it as JSON response
    const coinsData = result.data.coins.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol,
      uuid: coin.uuid,
      // Include other properties as needed
    }));

    res.status(200).json(coinsData);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
