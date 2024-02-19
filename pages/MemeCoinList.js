import React, { useEffect, useState } from 'react';

const MemeCoinList = () => {
  // Define a state variable to store the fetched data
  const [memeCoins, setMemeCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/meme');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Log or process the data as needed
        console.log('Fetched Data:', data);

        // Set the fetched data to the state
        setMemeCoins(data);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>List of Meme Coins</h1>
      <ul>
        {/* Map over the memeCoins state, not the fetchData function */}
        {memeCoins.map((coin) => (
          <li key={coin.uuid}>
            <p>Name: {coin.name}</p>
            <p>Symbol: {coin.symbol}</p>
            <p>UUID: {coin.uuid}</p>
            {/* Include other properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemeCoinList;
