# AI Readiness Assessment

Minimalistic single-page application for evaluating enterprise AI transformation readiness. Features persona-based assessments, keyboard shortcuts, and instant results.

## Features

- **Persona Selection** - Choose from pre-configured personas or start fresh
- **Phase-Based Assessment** - Navigate through Business Alignment, Technical Data Maturity, and Delivery Governance dimensions
- **Keyboard Shortcuts** - Navigate with ←→ arrows, select options with 1-9, continue with Enter
- **Instant Persona Switching** - Dropdown to quickly switch between personas and see their results
- **Score Card** - AI Readiness Index (0-100) with actionable recommendations
- **Export Results** - Download assessment data as JSON

## Quick Start

### Local Development
```bash
npm install
npm run dev
```

### Deploy to Vercel
```bash
vercel --prod
```

## File Structure

- `app.html` - Main application (Vue.js SPA)
- `intake.json` - Assessment schema and questions
- `persona-*.json` - Pre-configured persona data (5 personas)
- `api/intake.js` - Vercel serverless function for schema
- `api/personas.js` - Vercel serverless function for persona data
- `vercel.json` - Deployment configuration

## Assessment Dimensions

1. **Business Alignment** - Executive sponsorship, business case, ROI expectations
2. **Technical Data Maturity** - Infrastructure, data quality, AI/ML capabilities  
3. **Delivery Governance** - Change management, risk mitigation, success metrics

## Scoring Bands

- **0-39**: Foundational Risk - AI foundation modernization needed
- **40-59**: Emerging - Pilot ready, small applied cohort recommended
- **60-79**: Deployable - Production cohort deployment ready
- **80-100**: Scalable Transformation - Multi-cohort workforce transformation ready
- **Admin Dashboard** (`/admin`) — token-protected view of all entries with status management and admin notes
- **PDF Export** — generate professional PDF reports for any entry via jsPDF
- **Dual-Audience UX** — works for both client self-service and internal discovery calls

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd ai-workforce-intake
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
DATABASE_URL="postgresql://user:password@host:5432/ai_workforce_intake"
ADMIN_SECRET="your-strong-secret-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**PostgreSQL providers that work great:**
- [Neon](https://neon.tech) (free tier, serverless — recommended for Vercel)
- [Supabase](https://supabase.com) (free tier)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Railway](https://railway.app)
- Any standard PostgreSQL instance

### 3. Initialize Database

```bash
npx prisma db push
```

### 4. Run Locally

```bash
npm run dev
```

- **Form**: http://localhost:3000
- **Admin**: http://localhost:3000/admin

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables in Vercel project settings:
   - `DATABASE_URL`
   - `ADMIN_SECRET`
4. Deploy — Vercel auto-detects Next.js

### Netlify

1. Push to GitHub
2. Import in [Netlify Dashboard](https://app.netlify.com/start)
3. Install the `@netlify/plugin-nextjs` plugin
4. Add environment variables in Site Settings → Environment Variables
5. Deploy

## Project Structure

```
src/
├── app/
│   ├── layout.jsx          # Root layout with ThemeProvider
│   ├── page.jsx            # Main intake form page
│   ├── globals.css         # Theme variables + Tailwind
│   ├── admin/
│   │   └── page.jsx        # Admin dashboard
│   └── api/
│       └── entries/
│           ├── route.js    # POST (submit) + GET (list, admin)
│           └── [id]/
│               └── route.js # GET detail, PATCH, DELETE (admin)
├── components/
│   ├── IntakeForm.jsx      # Main form with all 7 phases
│   ├── AdminReport.jsx     # Admin dashboard + detail view
│   ├── ThemeProvider.jsx   # Light/dark context
│   └── ThemeToggle.jsx     # Toggle button
└── lib/
    ├── prisma.js           # Prisma client singleton
    ├── constants.js        # Weights, scores, formulas
    ├── phases.js           # Form phase/field definitions
    ├── auth.js             # Admin auth helper
    └── pdf-export.js       # Client-side PDF generation
```

## Admin Dashboard

Access at `/admin` with the `ADMIN_SECRET` you set in your environment.

**Capabilities:**
- View all submitted entries with filtering by status
- Drill into full entry detail with all responses
- Update entry status (draft → submitted → reviewed)
- Add internal admin notes
- Export any entry as a formatted PDF
- Delete entries

## AI Readiness Index

The readiness score is calculated as:

```
Index = Σ (dimension_score × weight) × 20
```

| Dimension | Weight |
|-----------|--------|
| Business Alignment | 20% |
| Technical & Data Maturity | 25% |
| Delivery Governance | 20% |
| Workforce Capability | 20% |
| Economic Readiness | 15% |

**Readiness Bands:**
- **0–39**: Foundational Risk
- **40–59**: Emerging
- **60–79**: Deployable
- **80–100**: Scalable Transformation

## License

Proprietary. Internal use only.
