const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Set CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Content-Type': 'application/json'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      };
    }

    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    // Read all persona files
    const personas = [];
    const personaFiles = [
      'persona-ideal-pioneer.json',
      'persona-eager-but-unprepared.json',
      'persona-ready-but-fragmented.json',
      'persona-regulatory-roadblock.json',
      'persona-tactical-staffing-seeker.json'
    ];

    for (const filename of personaFiles) {
      try {
        const filePath = path.join(__dirname, filename);
        console.log('Looking for persona file at:', filePath);
        
        if (!fs.existsSync(filePath)) {
          console.warn(`Persona file not found: ${filePath}`);
          continue;
        }
        
        const personaData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        personas.push(personaData);
      } catch (fileError) {
        console.warn(`Could not load persona file ${filename}:`, fileError.message);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(personas)
    };
  } catch (error) {
    console.error('Error in personas function:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};