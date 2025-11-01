const client = require('prom-client');
const http = require('http');

// Prometheus মেট্রিক্স সেবা তৈরি
const register = new client.Registry();
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});
register.registerMetric(httpRequestsTotal);

// HTTP সার্ভিস তৈরি
http.createServer((req, res) => {
  httpRequestsTotal.inc(); // প্রতি রিকোয়েস্টে কাউন্ট বাড়বে
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(3000);

// Prometheus এর জন্য মেট্রিক্স সংগ্রহ
http.createServer((req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(register.metrics());
}).listen(9090);

console.log("Server is running on port 3000 and Prometheus metrics are available at port 9090");
