import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const AltCoinList = () => {
  // Define state variables to store the fetched data and the selected tag
  const [memeCoins, setMemeCoins] = useState([]);
  const [selectedTag, setSelectedTag] = useState('meme'); // Default tag is 'meme'

  const fetchMemeCoins = async (tag) => {
    try {
      const response = await fetch(`/api/meme?tag=${tag}`);
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

  useEffect(() => {
    fetchMemeCoins(selectedTag);
  }, [selectedTag]);

  // Function to truncate a large number
  const truncated = (number, decimals) => {
    const factor = 10 ** decimals;
    return Math.trunc(number * factor) / factor;
  };

  const inclCommas = (number) => {
    return number.toLocaleString('en-US', { useGrouping: true });
  };

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>List of Meme Coins</h1>

        {/* Add a dropdown to select different categories (tags) */}
        <select 
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className={styles.dropdown} 
        >
          <option value="meme">Meme</option>
          <option value="ai">AI</option>
          <option value="defi">DeFi</option>
          <option value="gaming">Gaming</option>
          <option value="nft">NFT</option>
          <option value="fan-token">Fan Tokens</option>
          <option value="web3">Web3</option>
          <option value="metaverse">Metaverse</option>
          <option value="erc-20">ERC-20 Tokens</option>
          <option value="staking">Staking Coins</option>
          <option value="stablecoin">Stable Coins</option>
          {/* Add more options as needed */}
        </select>

        <div className={styles.grid}>
        {memeCoins.map((coin) => (
          <div key={coin.uuid} className={styles.card}>
            <img className="crypto-image" src={coin.url} width={42} height={42} />
            <p>Name: {coin.name} </p>
            <p>Symbol: {coin.symbol} </p>
            <p>ID: {coin.uuid} </p>
            <p>$/USD: ${truncated(coin.price, 10)}</p>
            <p>MarketCap: ${inclCommas(coin.marketCap)} </p>
            {/* Include other properties as needed */}
          </div>
        ))}

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    <div>
      
      <ul>
        {/* Map over the memeCoins state, not the fetchData function */}

      </ul>
    </div>
    </>
  );
};

export default AltCoinList;
