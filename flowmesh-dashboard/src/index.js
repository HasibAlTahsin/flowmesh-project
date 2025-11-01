import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 এ নতুন API
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React 18 এর নতুন পদ্ধতি
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Web vitals রিপোর্ট করতে পারেন
reportWebVitals();


