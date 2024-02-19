export async function getServerSideProps() {
    const options = {
      headers: {
        'x-access-token': 'your-api-key',
      },
    };
  
    try {
      const response = await fetch('https://api.coinranking.com/v2/coins?tags[]=meme', options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
  
      return {
        props: {
          coinData: result,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
  
      return {
        props: {
          coinData: null, // or handle error state as needed
        },
      };
    }
  }
  
  export default MyPage;