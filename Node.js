const client = require('prom-client');
const http = require('http');

const register = new client.Registry();
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});
register.registerMetric(httpRequestsTotal);

http.createServer((req, res) => {
  httpRequestsTotal.inc();
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('The Folw-Mesh project begins\n');
}).listen(3000);

http.createServer((req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(register.metrics());
}).listen(9090);

