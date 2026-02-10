// Function that returns a Promise with a random delay
const fetchSuggestions = async (query) => {
  if (!query) return [];
  console.log(`Fetching: ${query}`); // To prove caching works
  await new Promise(resolve => setTimeout(resolve, Math.random() * 800)); // Random delay 0-800ms
  return [
    `${query} tutorial`,
    `${query} interview questions`,
    `${query} documentation`,
    `${query} vs angular`,
    `${query} crash course`
  ];
};

export default fetchSuggestions;