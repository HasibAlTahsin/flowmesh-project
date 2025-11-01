import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9090/metrics')
      .then(response => {
        const data = response.data;
        const parsedData = parseMetrics(data);  // Parse the metrics data
        setMetrics(parsedData);
      })
      .catch(error => {
        console.error('Error fetching metrics', error);
      });
  }, []);

  const parseMetrics = (data) => {
    // Extract relevant metrics like response_time, cpu_usage, and availability
    return {
      responseTime: extractMetric(data, 'response_time'),
      cpuUsage: extractMetric(data, 'cpu_usage'),
      availability: extractMetric(data, 'availability')
    };
  };

  const extractMetric = (data, metricName) => {
    // Use regex to extract metric values from the Prometheus data
    const regex = new RegExp(`^${metricName} (\\d+\\.\\d+)`, 'm');
    const match = data.match(regex);
    return match ? match[1] : 'N/A';  // Return value or N/A if not found
  };

  return (
    <div className="App">
      <h1>FlowMesh Dashboard</h1>
      {metrics ? (
        <div>
          <h2>Service Metrics</h2>
          <p><strong>Response Time:</strong> {metrics.responseTime} ms</p>
          <p><strong>CPU Usage:</strong> {metrics.cpuUsage} %</p>
          <p><strong>Availability:</strong> {metrics.availability}</p>
        </div>
      ) : (
        <p>Loading metrics...</p>  {/* Display while data is loading */}
      )}
    </div>
  );
}

export default App;
