const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    // Check for specific payload file requested via query parameter
    const url = new URL(req.url, 'http://localhost');
    const payloadFile = url.searchParams.get('file') || 'intake.json';
    
    // Validate file name to prevent directory traversal
    const fileName = path.basename(payloadFile);
    if (!fileName.endsWith('.json')) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Only JSON files are supported' }));
      return;
    }

    const payloadPath = path.join(process.cwd(), fileName);
    
    if (!fs.existsSync(payloadPath)) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 
        error: `Payload file not found: ${fileName}`,
        available_files: fs.readdirSync(process.cwd())
          .filter(f => f.endsWith('.json'))
          .sort()
      }));
      return;
    }

    const raw = fs.readFileSync(payloadPath, 'utf8');
    
    // Validate JSON
    try {
      JSON.parse(raw);
    } catch (parseError) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 
        error: 'Invalid JSON in payload file',
        details: parseError.message 
      }));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.end(raw);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
      error: 'Unable to load payload', 
      details: err.message 
    }));
  }
};