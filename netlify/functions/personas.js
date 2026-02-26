// Embedded persona data to avoid file system issues in serverless environment
const personas = [
  {
    "client_id": "persona_ideal_pioneer",
    "metadata": {
      "client_name": "Persona: The Ideal Pioneer (Global Financial Services Tech)",
      "sponsor_name": "Synthetic Evaluation",
      "persona_description": "A tech-forward enterprise with strong leadership backing, seeking to upskill their entire engineering and product workforce to build native AI tools.",
      "team_size": 500,
      "budget": "Multi-million enterprise L&D budget",
      "timeline": "< 3 months"
    },
    "responses": {
      "Q1": 5, "Q2": 5, "Q3": 5, "Q4": 5, "Q5": 4, "Q6": 5, "Q7": 4, "Q8": 5, "Q9": 4, "Q10": 5, "Q11": 5, "Q12": 5, "Q13": 5, "Q14": 5, "Q15": 5
    }
  },
  {
    "client_id": "persona_eager_but_unprepared",
    "metadata": {
      "client_name": "Persona: The Eager but Unprepared (Mid-Sized Retail Chain)",
      "sponsor_name": "Synthetic Evaluation",
      "persona_description": "A highly enthusiastic culture wanting to deploy AI everywhere, but lacking the foundational data architecture and budget to actually support the tools.",
      "team_size": 350,
      "budget": "Constrained experimental budget",
      "timeline": "3-6 months"
    },
    "responses": {
      "Q1": 3, "Q2": 3, "Q3": 2, "Q4": 2, "Q5": 1, "Q6": 2, "Q7": 2, "Q8": 3, "Q9": 2, "Q10": 2, "Q11": 1, "Q12": 1, "Q13": 2, "Q14": 2, "Q15": 2
    }
  },
  {
    "client_id": "persona_ready_but_fragmented",
    "metadata": {
      "client_name": "Persona: The Ready but Fragmented (Large Manufacturing Enterprise)",
      "sponsor_name": "Synthetic Evaluation",
      "persona_description": "A large traditional company with strong infrastructure but a highly siloed workforce. Leadership wants AI, but employees are hesitant and lack basic knowledge.",
      "team_size": 1200,
      "budget": "Pilot budget in low seven figures",
      "timeline": "6-12 months"
    },
    "responses": {
      "Q1": 4, "Q2": 3, "Q3": 3, "Q4": 3, "Q5": 2, "Q6": 3, "Q7": 3, "Q8": 3, "Q9": 3, "Q10": 3, "Q11": 3, "Q12": 1, "Q13": 3, "Q14": 3, "Q15": 3
    }
  },
  {
    "client_id": "persona_regulatory_roadblock",
    "metadata": {
      "client_name": "Persona: The Regulatory Roadblock (Multinational Healthcare)",
      "sponsor_name": "Synthetic Evaluation",
      "persona_description": "Deep pockets and high technical ambition, but entirely gridlocked by international health data regulations, privacy blockers, and a risk-averse legal team.",
      "team_size": 800,
      "budget": "Board-approved multi-million budget",
      "timeline": "12+ months"
    },
    "responses": {
      "Q1": 4, "Q2": 3, "Q3": 2, "Q4": 3, "Q5": 2, "Q6": 1, "Q7": 1, "Q8": 1, "Q9": 2, "Q10": 1, "Q11": 3, "Q12": 1, "Q13": 2, "Q14": 1, "Q15": 2
    }
  },
  {
    "client_id": "persona_tactical_staffing_seeker",
    "metadata": {
      "client_name": "Persona: The Tactical Staffing Seeker (Legacy Logistics)",
      "sponsor_name": "Synthetic Evaluation",
      "persona_description": "They do not want to upskill their workforce; they just want to hire 5 prompt engineers on short-term contracts to fix a spreadsheet problem.",
      "team_size": 60,
      "budget": "Minimal short-term project budget",
      "timeline": "< 3 months"
    },
    "responses": {
      "Q1": 1, "Q2": 1, "Q3": 1, "Q4": 0, "Q5": 1, "Q6": 0, "Q7": 1, "Q8": 1, "Q9": 0, "Q10": 1, "Q11": 1, "Q12": 5, "Q13": 1, "Q14": 1, "Q15": 1
    }
  }
];

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