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
    const personasDir = process.cwd();
    const files = fs.readdirSync(personasDir).filter((f) =>
      f.startsWith('persona-') && f.endsWith('.json')
    );

    const personas = files.map((file) => {
      const raw = fs.readFileSync(path.join(personasDir, file), 'utf8');
      const json = JSON.parse(raw);
      return json;
    });

    const url = new URL(req.url, 'http://localhost');
    const id = url.searchParams.get('id');

    let result = personas;
    if (id) {
      result = personas.find((p) => p.client_id === id || p.metadata?.client_name === id) || null;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Unable to load personas', details: err.message }));
  }
};