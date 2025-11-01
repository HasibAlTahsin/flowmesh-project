import React from 'react';

function Dashboard({ metrics }) {
  return (
    <div>
      <h3>Prometheus Metrics:</h3>
      {metrics ? (
        <pre>{metrics}</pre>  {/* Prometheus থেকে পাওয়া মেট্রিক্স ডেটা প্রদর্শন */}
      ) : (
        <p>Loading metrics...</p>  {/* ডেটা না এলে লোডিং বার্তা দেখাবে */}
      )}
    </div>
  );
}

export default Dashboard;
