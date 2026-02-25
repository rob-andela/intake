#!/usr/bin/env node

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 80;
const API_PORT = process.env.API_PORT || 8080;
const isVercel = process.env.VERCEL === '1';

// Serve static files
app.use(express.static('.', {
  // Set proper MIME types
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
    }
  }
}));

// Import and use Vercel API routes
if (!isVercel) {
  console.log(`🔗 API routes will be handled by separate API server on port ${API_PORT}`);
}

// Route handlers for different pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app.html'));
});

app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, 'app.html'));
});

app.get('/intake', (req, res) => {
  res.sendFile(path.join(__dirname, 'intake.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'app.html'));
});

if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`🌐 Main App Server running on http://localhost:${PORT}`);
    console.log(`📋 Main App: http://localhost:${PORT}/`);
    console.log(`� Start API server separately: node api-server.js`);
  });
}

module.exports = app;