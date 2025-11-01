import React, { useEffect, useState } from 'react';
import './App.css'; // স্টাইল ফাইল যদি থাকে

function App() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch('http://localhost:9090/metrics') // Prometheus থেকে মেট্রিক্স ডেটা ফেচ করা হচ্ছে
      .then(response => response.text())
      .then(data => {
        setMetrics(data);  // মেট্রিক্স ডেটা state তে সেট করা হচ্ছে
      });
  }, []);

  return (
    <div className="App">
      {/* আগের ডিফল্ট কোড */}
      <header className="App-header">
        <img src="logo.svg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* নতুন কোড (Prometheus থেকে ডেটা প্রদর্শন) */}
      <div>
        <h1>FlowMesh Dashboard</h1>
        <h3>Prometheus Metrics:</h3>
        <pre>{metrics}</pre> {/* এখানে Prometheus এর মেট্রিক্স ডেটা দেখানো হবে */}
      </div>
    </div>
  );
}

export default App;

