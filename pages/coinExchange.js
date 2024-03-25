import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { calculateTotal } from './api/calculateTotal'; // Import the calculateTotal function
import { fetchMemeCoinsWithTimePeriod } from './fetchMemeCoins';

const AltCoinList = () => {
  // Define state variables to store the fetched data and the selected tag
  const [memeCoins, setMemeCoins] = useState([]);
  const [selectedTag, setSelectedTag] = useState('meme');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('24h');
  const [totals, setTotals] = useState({
    total1: 0,
    total2: 0,
    total3: 0,
    currentTag: 0,
  });

  useEffect(() => {
    const fetchMemeCoins = async (tag) => {
      try {
        const response = await fetch(`/api/api?tag=${tag}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Set the fetched data to the state
        setMemeCoins(data);

        // Calculate totals based on the fetched data
        const total1 = calculateTotal(data, 'marketCap');
        const total2 = calculateTotal(data, 'marketCap', - 'bitcoin');
        const total3 = calculateTotal(data, 'marketCap', - ['bitcoin', 'ethereum']);
        const currentTag = calculateTotal(data, 'marketCap', [selectedTag]);
        
        // Log intermediate values
        console.log('Intermediate Values:', { total1, total2, total3, currentTag });

        // Set the totals to the state
        setTotals({ total1, total2, total3, currentTag });
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };

    fetchMemeCoins(selectedTag);
  }, [selectedTag]);

    // Function to handle time period change
    const handleTimePeriodChange = (event) => {
      setSelectedTimePeriod(event.target.value);
    };

    // Function to fetch meme coins data with the selected time period
    const fetchMemeCoinsDataWithTimePeriod = async (selectedTag, selectedTimePeriod) => {
      try {
        const data = await fetchMemeCoinsWithTimePeriod(selectedTag, selectedTimePeriod);
        setMemeCoins(data);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching meme coins data:', error);
      }
    };

    // useEffect hook to fetch meme coins data when selected tag or time period changes
    useEffect(() => {
      fetchMemeCoinsDataWithTimePeriod(selectedTag, selectedTimePeriod);
    }, [selectedTag, selectedTimePeriod]);

  // Function to truncate a large number
  const truncated = (number, decimals) => {
    const factor = 10 ** decimals;
    return Math.trunc(number * factor) / factor;
  };

  const inclCommas = (number) => {
    return number.toLocaleString('en-US', { useGrouping: true });
  };
  console.log(inclCommas(123456789));

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
           {/* Include other properties as needed */}
        </select>
        <select value={selectedTimePeriod} onChange={handleTimePeriodChange}>
          <option value="1h">1 Hour</option>
          <option value="3h">3 Hours</option>
          <option value="12h">12 Hours</option>
          <option value="24h">24 Hours</option>
          {/* Add other time periods as needed */}
        </select>
          {/* Display totals */}
          <div>
            <h2>Total 1: {totals.total1 ? inclCommas(totals.total1.total1) : 'N/A'}</h2>
            <h2>Total 2: {totals.total2 ? inclCommas(totals.total2.total2) : 'N/A'}</h2>
            <h2>Total 3: {totals.total3 ? inclCommas(totals.total3.total3) : 'N/A'}</h2>
            <h2>{`Market Cap for ${selectedTag}: ${totals.currentTag[selectedTag] ? inclCommas(totals.currentTag[selectedTag]) : 'N/A'}`}</h2>
          </div>

        <div className={styles.grid}>
        {memeCoins.map((coin) => (
          <div key={coin.uuid} className={styles.card}>
            <img className="crypto-image" src={coin.url} width={42} height={42} />
            <p>Name: {coin.name}</p>
            <p>Symbol: {coin.symbol}</p>
            <p>ID: {coin.uuid}</p>
            <p>$USD: ${truncated(coin.price, 10)}</p>
            <p>Market Cap: ${inclCommas(coin.marketCap)}</p>
            <p>Vol: {coin.volume24h ? inclCommas(coin.volume24h) : 'N/A'}</p>
            <p>Change ({selectedTimePeriod}): {coin.change[selectedTimePeriod]}%</p>
            <p>Listed: {coin.listedAt}</p>
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
