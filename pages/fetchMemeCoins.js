// Modify the API response to include percentage change for each time period
const fetchMemeCoinsWithTimePeriod = async (tag, timePeriod) => {
    try {
      const response = await fetch(`/api/api?timePeriod=${timePeriod}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
       
      }
      console.log('Time', timePeriod)
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching meme coins data with time period:', error);
    }
  };
  