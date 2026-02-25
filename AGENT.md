## AI Workforce Intake Agent

### Purpose

This app is an in-browser **AI Workforce Transformation intake form** used to:

- Capture structured answers from an enterprise about their AI readiness.
- Compute a weighted **AI Readiness Index (0–100)**.
- Produce a summarized scorecard that can directly inform curriculum design and go/no-go decisions for large-scale AI upskilling programs.

The form is intentionally lightweight (single `intake.html` file, no backend) so it can be hosted anywhere that can serve static files.

### How the form works

- On page load the script tries to **auto-load a schema** from `./intake.json`:
  - If `intake.json` exists and is valid JSON, the app:
    - Parses it into an internal `questions` array and `weights` map.
    - Hides the setup screen.
    - Starts the step-by-step questionnaire.
  - If `intake.json` is missing or invalid:
    - The **setup card** at the top is shown.
    - The user can:
      - Upload a different schema (`.json`).
      - Download a sample schema (starter JSON) to adapt and re-upload.

- The user answers questions one at a time:
  - Keyboard shortcuts: arrow keys, letter keys (A, B, C, …) for choices, Enter for text inputs.
  - Touch gestures: swipe left/right on mobile to move between questions.
  - Answers are stored in a `payload` object:
    - `payload.metadata` for metadata questions.
    - `payload.responses` keyed by question id (e.g. `Q1` … `Q15`).

- When all questions are answered, the app:
  - Computes **dimension-level scores** based on `weights`.
  - Computes a final **AI Readiness Index** and readiness band.
  - Renders a **summary card + detailed per-question summary**.
  - Allows the user to:
    - Jump back and edit any question.
    - Download the entire completed payload as JSON.

### Schema structure (`intake.json`)

The schema is defined in `intake.json` as:

- Root key: `intake_assessment`
  - `metadata`: definitions for metadata questions (e.g. sponsor name, team size, budget, timeline).
    - Each field has:
      - `type`: `"text" | "number" | "select"`.
      - `label`: question text.
      - For `select`, an `options` array of string labels.
  - `dimensions`: readiness dimensions, each with:
    - `weight`: numeric weight used in the final index calculation.
    - `questions`: array of question definitions.

Each question under a dimension has:

- `id`: e.g. `"Q1"`–`"Q15"`.
- `type`: usually `"multiple_choice"` (mapped to `"choice"` internally).
- `text`: the full prompt text shown to the user.
- `options`: array of:
  - `value`: numeric score (0–5).
  - `label`: human-readable option text.

The app **does not hard-code question ids or text**; it reads them from the schema and renders whatever it finds, as long as the structure above is respected.

### Current question framework (15 questions, 5 dimensions)

The default `intake.json` reflects the **Strategic Partner Facilitator Guide** you provided, mapped into five weighted dimensions:

- **Business Alignment (20%)**
  - Q1: Primary Business Outcomes.
  - Q2: Timeline Pressure.
  - Q3: Executive Alignment & Ownership.
  - Q4: Budget Maturity.

- **Technical & Data Maturity (25%)**
  - Q5: Data Readiness.
  - Q6: Platform & Architecture Readiness.

- **Delivery Governance (20%)**
  - Q7: Deployment Velocity & Governance.
  - Q8: Vendor Ecosystem Complexity.
  - Q14: AI Security, Privacy & Ethics Ownership.

- **Workforce Capability (20%)**
  - Q9: Cultural Readiness & Diversity.
  - Q10: Capability Depth (Hard Skills).
  - Q11: Geographic Dispersion & Hub Definitions.
  - Q12: Labor Relations Constraints.
  - Q13: Organizational Change Management & Reskilling Pathway.

- **Economic Readiness (15%)**
  - Q15: Quantifiable Risk Mitigation & ROI Targets.

Each question uses option `value`s that match your scoring brackets (0/1/2/3/4/5 where specified in the guide).

### Scoring and readiness bands

Internally, the app:

- Accumulates the numeric `value`s for each answered question by dimension.
- Computes **average scores per dimension**, then applies dimension `weight`s.
- Scales the aggregated value to a **0–100 AI Readiness Index**.
- Maps the index to a readiness band and recommendation:
  - 0–39: Foundational Risk.
  - 40–59: Emerging.
  - 60–79: Deployable.
  - 80–100: Scalable Transformation.

The calculated scores (index, band, recommendation) are stored on `payload.calculated_scores` and displayed at the top of the results view.

### Personas and sample profiles

The repo includes **persona JSON profiles** (e.g. `persona-ideal-pioneer.json`, `persona-ready-but-fragmented.json`, etc.) that:

- Reuse the same shape as `payload` (`client_id`, `metadata`, `responses`).
- Pre-populate `responses` for `Q1`–`Q15` to illustrate:
  - Ideal transformation candidate.
  - Ready but fragmented.
  - Eager but unprepared.
  - Regulatory roadblock.
  - Tactical staffing seeker (likely disqualify/redirect).

Usage:

- Load a schema (or rely on `intake.json`).
- Use the toolbar’s **Load Profile (.json)** button to import any persona file.
- The app jumps straight to the **results view** with that persona’s scores and summary.

### How to customize or extend

- **Change questions or weights**:
  - Edit `intake.json`:
    - Adjust or add dimensions, questions, and weights.
  - The UI will automatically reflect those changes.

- **Change metadata fields**:
  - Update `intake_assessment.metadata` in `intake.json`.
  - Each metadata field becomes a simple input step at the beginning of the form.

- **Adjust scoring logic**:
  - Logic lives in `calculateScore()` inside `intake.html`.
  - If you change dimension weights or want to alter how the final index is derived, update that function to match your preferred formula.

### Operational notes

- This is a **static, client-side app**:
  - No server-side storage or authentication.
  - All data lives in the browser until the user downloads a JSON file.

- Recommended usage:
  - Serve via a simple static host (e.g. GitHub Pages, S3, static web server).
  - Keep `intake.json` version-controlled alongside `intake.html`.
  - For different clients, either:
    - Swap `intake.json` per deployment, or
    - Provide alternative schema JSONs and instruct facilitators to upload the right one from the setup screen.

