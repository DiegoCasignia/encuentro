require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const services = require('./src/config/services');
const authenticate = require('./src/middlewares/auth');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.disable('x-powered-by');
app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(express.json({ limit: '10kb' }));

app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  if (req.path.startsWith('/api/auth')) return next();
  authenticate(req, res, next);
});

Object.entries(services).forEach(([serviceName, config]) => {
  const routePath = `/api/${serviceName.replace('Service', '').toLowerCase()}`;
  
  app.use(routePath, createProxyMiddleware({
    target: config.baseUrl,
    changeOrigin: true,
    pathRewrite: { [`^${routePath}`]: '' },
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader('x-user-id', req.user.userId);
        proxyReq.setHeader('x-user-email', req.user.email);
        proxyReq.setHeader('x-user-role', req.user.role);
      }
    },
    onError: (err, req, res) => {
      console.error(`[${serviceName}] Proxy Error:`, err);
      res.status(503).json({ 
        error: `Service ${serviceName} unavailable`,
        details: err.message
      });
    }
  }));
});

app.get('/', (req, res) => {
  res.json({
    message: 'API Gateway',
    status: 'running',
    authenticated: !!req.user,
    services: Object.keys(services).map(name => ({
      name: name.replace('Service', ''),
      path: `/api/${name.replace('Service', '').toLowerCase()}`
    }))
  });
});

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
  console.log('Services:');
  Object.entries(services).forEach(([name, config]) => {
    console.log(`- ${name.padEnd(18)}: ${config.baseUrl}`);
  });
  console.log('Authentication: Required for all routes except /api/auth');
});