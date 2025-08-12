require('dotenv').config();
const express = require('express');
const httpProxy = require('http-proxy');
const services = require('./src/config/services');

const app = express();
const PORT = process.env.PORT || 8080;
const proxy = httpProxy.createProxyServer({});

app.disable('x-powered-by');
app.use(require('cors')());
app.use(require('morgan')('dev'));

// Manejar errores del proxy
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  if (!res.headersSent) {
    res.status(503).json({ error: 'Service unavailable' });
  }
});

// Proxy para auth service (rutas públicas)
app.use('/api/auth', (req, res) => {
  const target = process.env.AUTH_SERVICE_URL || 'http://localhost:3004';
  
  console.log(`Proxying ${req.method} ${req.url} to ${target}`);
  
  // Reescribir el path
  req.url = req.url.replace('/api/auth', '');
  
  proxy.web(req, res, {
    target: target,
    changeOrigin: true,
    selfHandleResponse: false
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});