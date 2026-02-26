// Embedded intake data to avoid file system issues in serverless environment
const intakeData = {
  "intake_assessment": {
    "metadata": {
      "sponsor_name": {
        "type": "text",
        "label": "Name of the Executive Sponsor"
      },
      "team_size": {
        "type": "number",
        "label": "Size of the team to assess/upskill"
      },
      "budget": {
        "type": "text",
        "label": "Approved Budget Range"
      },
      "timeline": {
        "type": "select",
        "label": "Timeline pressure for production delivery",
        "options": ["< 3 months", "3-6 months", "6-12 months", "12+ months"]
      }
    },
    "dimensions": {
      "business_alignment": {
        "weight": 0.20,
        "questions": [
          {
            "id": "Q1",
            "type": "multiple_choice",
            "text": "Primary Business Outcomes — What business outcomes are driving this AI initiative?",
            "options": [
              { "value": 1, "label": "Revenue" },
              { "value": 2, "label": "Operational efficiency" },
              { "value": 3, "label": "Risk mitigation" },
              { "value": 4, "label": "Customer Experience (CX)" },
              { "value": 5, "label": "Product innovation" }
            ]
          },
          {
            "id": "Q2",
            "type": "multiple_choice",
            "text": "Timeline Pressure — What timeline pressure exists for production delivery?",
            "options": [
              { "value": 1, "label": "Exploratory / No strict timeline" },
              { "value": 2, "label": "Medium-term (6-12 months)" },
              { "value": 3, "label": "Near-term (3-6 months)" },
              { "value": 5, "label": "Immediate (0-3 months)" }
            ]
          },
          {
            "id": "Q3",
            "type": "multiple_choice",
            "text": "Executive Alignment & Ownership — Assess the executive sponsor and success owner alignment.",
            "options": [
              { "value": 1, "label": "Missing executive alignment" },
              { "value": 2, "label": "Executive interest without delivery ownership" },
              { "value": 5, "label": "Executive sponsor and success owner both confirmed and engaged" }
            ]
          },
          {
            "id": "Q4",
            "type": "multiple_choice",
            "text": "Budget Maturity — What is the current budget range and approval maturity?",
            "options": [
              { "value": 0, "label": "Unfunded" },
              { "value": 2, "label": "Budget tied to experimentation rather than production" },
              { "value": 3, "label": "Budget approved for pilot/MVP" },
              { "value": 5, "label": "Budget fully approved for production" }
            ]
          }
        ]
      },
      "technical_data_maturity": {
        "weight": 0.25,
        "questions": [
          {
            "id": "Q5",
            "type": "multiple_choice",
            "text": "Data Readiness — Assess data availability, quality, and governance.",
            "options": [
              { "value": 1, "label": "Weak data foundation" },
              { "value": 2, "label": "Batch capability available, but low quality" },
              { "value": 4, "label": "Good quality data with real-time versus batch capability" },
              { "value": 5, "label": "High availability with residency, sovereignty, and regulatory handling managed" }
            ]
          },
          {
            "id": "Q6",
            "type": "multiple_choice",
            "text": "Platform & Architecture Readiness — Assess cloud maturity, CI/CD, and model hosting.",
            "options": [
              { "value": 0, "label": "Fragile or noncompliant architecture; No production ML platform" },
              { "value": 2, "label": "Basic cloud maturity, manual deployments" },
              { "value": 3, "label": "Maturing API-first, improving observability" },
              { "value": 5, "label": "Mature model hosting, orchestration, monitoring, and security enforcement" }
            ]
          }
        ]
      },
      "delivery_governance": {
        "weight": 0.20,
        "questions": [
          {
            "id": "Q7",
            "type": "multiple_choice",
            "text": "Deployment Velocity & Governance — Evaluate Agile maturity and sprint predictability.",
            "options": [
              { "value": 1, "label": "Long cycle time to production / Re-architecture mid-delivery" },
              { "value": 2, "label": "Compliance reviews delaying releases" },
              { "value": 3, "label": "Moderate deployment velocity but lacks deployment readiness metrics" },
              { "value": 5, "label": "High sprint predictability with release management and rollback traceability" }
            ]
          },
          {
            "id": "Q8",
            "type": "multiple_choice",
            "text": "Vendor Ecosystem Complexity — Are the target AI systems highly dependent on legacy third-party vendors?",
            "options": [
              { "value": 1, "label": "Highly dependent on rigid legacy vendors" },
              { "value": 3, "label": "Mixed vendor environment with maturing API integrations" },
              { "value": 5, "label": "Fully internal or using highly interoperable modern vendor ecosystem" }
            ]
          },
          {
            "id": "Q14",
            "type": "multiple_choice",
            "text": "AI Security, Privacy & Ethics Ownership — Who holds the ultimate sign-off and enforcement authority for data privacy, security, and ethical AI deployment?",
            "options": [
              { "value": 1, "label": "No dedicated owner; responsibility is vaguely distributed across teams." },
              { "value": 2, "label": "Security/Legal acts only in an advisory, post-development capacity." },
              { "value": 3, "label": "A single leader is assigned but lacks true budgetary or enforcement authority." },
              { "value": 4, "label": "An executive sponsor (e.g., CISO, Chief Data Officer) is a key stakeholder with sign-off authority." },
              { "value": 5, "label": "Active, empowered ownership from an executive who partners in the architectural design process from day one." }
            ]
          }
        ]
      },
      "workforce_capability": {
        "weight": 0.20,
        "questions": [
          {
            "id": "Q9",
            "type": "multiple_choice",
            "text": "Cultural Readiness & Diversity — Is the enterprise culture experimentation-friendly or risk-averse?",
            "options": [
              { "value": 0, "label": "Cultural resistance to AI, automation or reskilling" },
              { "value": 2, "label": "Role protection mindset" },
              { "value": 4, "label": "Openness to reskilling and role evolution" },
              { "value": 5, "label": "High psychological safety for experimentation" }
            ]
          },
          {
            "id": "Q10",
            "type": "multiple_choice",
            "text": "Capability Depth (Hard Skills) — Assess current AI/ML capability depth.",
            "options": [
              { "value": 1, "label": "AI/ML skill shortages; Beginner seniority" },
              { "value": 3, "label": "Intermediate seniority; mostly experimentation experience" },
              { "value": 5, "label": "Advanced seniority; Production AI experience" }
            ]
          },
          {
            "id": "Q11",
            "type": "multiple_choice",
            "text": "Geographic Dispersion & Hub Definitions — Where must delivery, data, and talent be geographically located?",
            "options": [
              { "value": 1, "label": "Highly Dispersed (Scattered across 3+ distinct time zones causing timezone collaboration friction)" },
              { "value": 3, "label": "Hub and Spoke (Split evenly between an HQ and nearshore/offshore requirements)" },
              { "value": 5, "label": "Highly Centralized / Dedicated AI Tech COE (>80% in a single location with time zone alignment)" }
            ]
          },
          {
            "id": "Q12",
            "type": "multiple_choice",
            "text": "Labor Relations Constraints — Are there language and regulatory employment limits (e.g., Works Councils, Unions)?",
            "options": [
              { "value": 1, "label": "Yes, strict labor/union approvals required prior to any workforce transformation." },
              { "value": 5, "label": "No heavy labor restrictions limiting team deployment." }
            ]
          },
          {
            "id": "Q13",
            "type": "multiple_choice",
            "text": "Organizational Change Management & Reskilling Pathway — Is there a formal, funded change management plan to handle the impact of AI on existing roles?",
            "options": [
              { "value": 1, "label": "No plan or budget for organizational change management." },
              { "value": 2, "label": "Informal communication only; lacks dedicated executive sponsorship." },
              { "value": 3, "label": "Basic communication plan for reskilling, but no defined change metrics." },
              { "value": 4, "label": "Formal plan with defined stakeholder engagement and communication cadences." },
              { "value": 5, "label": "Integrated strategy including preemptive role evolution, reskilling, and clear internal mobility pathways." }
            ]
          }
        ]
      },
      "economic_readiness": {
        "weight": 0.15,
        "questions": [
          {
            "id": "Q15",
            "type": "multiple_choice",
            "text": "Quantifiable Risk Mitigation & ROI Targets — What are the quantifiable business metrics (cost avoidance, revenue uplift, delivery velocity) that will define this cohort's success?",
            "options": [
              { "value": 1, "label": "Vague aspirational goals only; high risk of unclear ROI." },
              { "value": 2, "label": "Targets based solely on the cost of the training/pilot, not long-term enterprise value." },
              { "value": 3, "label": "Clear but non-committed business case with projected ROI." },
              { "value": 4, "label": "Business case with committed financial targets and a defined success owner." },
              { "value": 5, "label": "Fully validated ROI model (cost-avoidance/revenue-uplift) signed off by Finance/Economics." }
            ]
          }
        ]
      }
    }
  }
};

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
      body: JSON.stringify(intakeData)
    };
  } catch (error) {
    console.error('Error in intake function:', error);
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