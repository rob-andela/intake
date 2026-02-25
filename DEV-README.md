# AI Intake Assessment - Unified Platform

This application provides a unified Vue.js-based platform that combines assessment functionality with dynamic JSON payload loading, compatible with both local development and Vercel deployment.

## 🚀 Quick Start (Recommended)

### Option 1: Local Node.js Server
```bash
npm install
npm run dev
```

The app will be available at:
- **Main Application**: http://localhost:3000 (Unified Vue.js app)
- **Legacy Intake Form**: http://localhost:3000/intake (Original vanilla JS)
- **Legacy Dashboard**: http://localhost:3000/dashboard (Original React-based)
- **Landing Page**: http://localhost:3000/landing

### Option 2: DDev Local Environment
```bash
ddev start
ddev start-node
```

The app will be available at:
- **Main Site**: https://ai-intake-readiness.ddev.site:8443

## 🔧 New Unified Application Features

### Dynamic JSON Payload Loading
- **Auto-discovery**: Automatically finds all JSON files in the project
- **Flexible loading**: Can load `intake.json`, `payload.json`, or any custom JSON schema
- **API endpoint**: `/api/payload?file=filename.json` for dynamic loading
- **File validation**: Validates JSON structure and provides error handling

### Vue.js Single-Page Application (`app.html`)
- **Multi-tab interface**: Assessment, Results, and Dashboard views
- **Real-time scoring**: Live AI readiness index calculation
- **Dark/light theme**: Toggle between themes
- **Progress tracking**: Visual progress bar and completion percentage
- **Export functionality**: Download results as JSON
- **Responsive design**: Works on desktop and mobile

## 📁 Key Files

### New Unified Stack:
- `app.html` - **Main Vue.js application** (combines functionality of index.html + intake.html)
- `api/payload.js` - **Dynamic JSON payload loader** (supports any JSON schema file)
- `server.js` - **Updated Express server** with new routing

### Legacy Files (Still Available):
- `intake.html` - Original vanilla JS assessment form  
- `index.html` - Original React-based dashboard
- `landing.html` - Simple landing page

### Configuration:
- `intake.json` - Default assessment schema
- `vercel.json` - Updated Vercel deployment configuration
- `package.json` - Node.js dependencies and scripts

## 🎯 Enhanced Features

- ✅ **Unified Interface** - Single Vue.js app combining all functionality
- ✅ **Dynamic Schema Loading** - Load any JSON schema via API or file upload
- ✅ **Auto-discovery** - Automatically detect available JSON payload files
- ✅ **Multi-language Support** - Vue.js provides better structure than vanilla JS
- ✅ **Real-time Updates** - Live scoring and progress tracking
- ✅ **Theme Support** - Dark/light mode toggle
- ✅ **Export/Import** - Full assessment data export/import
- ✅ **DDev Compatible** - Works with local DDev development
- ✅ **Vercel Ready** - Optimized for serverless deployment

## 🔗 API Endpoints

- `GET /api/intake` - Returns the intake.json schema (legacy)
- `GET /api/payload` - Returns intake.json by default
- `GET /api/payload?file=<filename>` - Returns any JSON file dynamically
- `GET /api/personas` - Returns all persona JSON files  
- `GET /api/personas?id=<client_id>` - Returns specific persona

### Payload API Features:
```javascript
// Load specific file
fetch('/api/payload?file=custom-assessment.json')

// File discovery (triggers error with available files list)
fetch('/api/payload?file=nonexistent.json')
  .then(res => res.json())
  .then(data => console.log(data.available_files))
```

## 🌐 Architecture

### Consistent Stack:
- **Frontend**: Vue.js 3 (CDN) - Reactive, component-based UI
- **Backend**: Express.js + Serverless Functions
- **API**: RESTful endpoints with dynamic JSON payload loading
- **Deployment**: Vercel-optimized with local development support

### File Structure:
```
/
├── app.html              # 🎯 Main Vue.js application
├── api/
│   ├── intake.js         # Legacy intake endpoint
│   ├── payload.js        # 🎯 Dynamic JSON loader
│   └── personas.js       # Persona data endpoint  
├── intake.json           # Default assessment schema
├── server.js             # 🎯 Updated local development server
└── vercel.json          # 🎯 Updated deployment config
```

## 🌟 Migration Path

1. **Current Users**: Can continue using existing `/intake` and `/dashboard` routes
2. **New Users**: Should use the main `/` route for the unified Vue.js application
3. **Developers**: Can extend the Vue.js app or create new JSON schemas dynamically