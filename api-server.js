#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const API_PORT = process.env.API_PORT || 8080;

// Enable CORS for cross-origin requests from main app
app.use(cors());

// API routes using the existing handlers
const intakeHandler = require('./api/intake.js');
const personasHandler = require('./api/personas.js');
const payloadHandler = require('./api/payload.js');

app.get('/api/intake', (req, res) => {
  intakeHandler(req, res);
});

app.get('/api/personas', (req, res) => {
  personasHandler(req, res);
});

app.get('/api/payload', (req, res) => {
  payloadHandler(req, res);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(API_PORT, () => {
  console.log(`🔗 API Server running on http://localhost:${API_PORT}`);
  console.log(`📋 Intake API: http://localhost:${API_PORT}/api/intake`);
  console.log(`📦 Payload API: http://localhost:${API_PORT}/api/payload`);
  console.log(`👥 Personas API: http://localhost:${API_PORT}/api/personas`);
});