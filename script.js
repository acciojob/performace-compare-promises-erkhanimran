// Array of API URLs to fetch data from
const apiUrls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/4",
  "https://jsonplaceholder.typicode.com/todos/5",
  "https://jsonplaceholder.typicode.com/todos/6",
  "https://jsonplaceholder.typicode.com/todos/7",
  "https://jsonplaceholder.typicode.com/todos/8",
  "https://jsonplaceholder.typicode.com/todos/9",
  "https://jsonplaceholder.typicode.com/todos/10",
];

// You can write your code here
 // Function to fetch data from an API using Fetch API
    async function fetchData(url) {
      const startTime = performance.now();
      try {
        const response = await fetch(url);
        const data = await response.json();
        const endTime = performance.now();
        return {
          url,
          timeTaken: endTime - startTime,
          data,
        };
      } catch (error) {
        return {
          url,
          timeTaken: -1, // Indicates an error occurred during fetch
          error,
        };
      }
    }

    // Function to fetch data from multiple APIs using Promise.all
    async function fetchAllApis() {
      const promises = apiUrls.map(url => fetchData(url));
      const results = await Promise.all(promises);
      return results;
    }

    // Function to fetch data from multiple APIs using Promise.any
    async function fetchAnyApi() {
      const promises = apiUrls.map(url => fetchData(url));
      const results = await Promise.any(promises);
      return results;
    }

    // Function to display the results in the table
    async function displayResults() {
      // Fetch data using Promise.all
      const allStartTime = performance.now();
      const allResults = await fetchAllApis();
      const allEndTime = performance.now();
      const allTimeTaken = allEndTime - allStartTime;
      document.getElementById("output-all").innerText = allTimeTaken.toFixed(2);

      // Fetch data using Promise.any
      const anyStartTime = performance.now();
      const anyResults = await fetchAnyApi();
      const anyEndTime = performance.now();
      const anyTimeTaken = anyEndTime - anyStartTime;
      document.getElementById("output-any").innerText = anyTimeTaken.toFixed(2);
    }

    // Call the displayResults function when the page is loaded
    window.onload = displayResults;