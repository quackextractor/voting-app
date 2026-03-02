# Voting Application

A full-stack web application for creating and managing a single question poll. Built with Node.js, Express, SQLite, React, Vite, TailwindCSS v4, and shadcn-ui.

## Features

- **Vote:** Users can vote on options but are prevented from double voting using a combination of IP address tracking and a persistent cookie footprint.
- **View Results:** Real-time (auto-refreshed) view of the current poll standings with animated progress bars.
- **Admin Panel:** A standalone, premium control panel at `/admin` for resetting the poll safely using a secure token. Decoupled from the main React app.
- **System Monitor:** A real-time, standalone monitoring dashboard at `/monitor` displaying process uptime, memory usage, and application statistics.
- **Health Check:** A monitoring-friendly endpoint at `/health` returning system and application status.

## Directory Structure

- `frontend/`: The unified application containing both the React UI and the Node.js API.
  - `frontend/src/`: React + Vite application.
  - `frontend/api/`: Express.js serverless functions (Vercel-native).

## Deployment on Vercel & Supabase (Recommended)

This application is now a unified project designed for **Vercel**.

### 1. Database Setup (Supabase)
1. Create a new project on [Supabase](https://supabase.com/).
2. Go to the **SQL Editor** and run the contents of `frontend/api/supabase_schema.sql` to initialize your tables.
3. Go to **Project Settings > Database** and copy your **Connection String (URI)**.
   - It should look like: `postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres`

### 2. Unified Deployment (Vercel)
1. Push your code to GitHub.
2. Import your repository into [Vercel](https://vercel.com/new).
3. Set the **Root Directory** to `frontend`.
4. Set the following **Environment Variables**:
   - `DATABASE_URL`: Your Supabase connection string.
   - `VITE_API_BASE_URL`: (Optional) Can be left empty for Vercel, as rewrites are handled by `vercel.json`.
5. Vercel will automatically deploy the frontend and the `api/` folder as Serverless Functions.

## Deployment on Render.com

## Monitoring with UptimeRobot

To ensure your application is always up and running, it is recommended to set up monitoring with [UptimeRobot](https://uptimerobot.com/).

1.  **Create a Monitor:** In your UptimeRobot dashboard, click **Add New Monitor**.
2.  **Monitor Type:** Select **HTTP(s)**.
3.  **Friendly Name:** Enter a name like `Voting App Backend`.
4.  **URL (or IP):** Enter your backend health check URL (e.g., `https://your-backend.onrender.com/health`).
5.  **Monitoring Interval:** Set your preferred interval (e.g., every 5 minutes).
6.  **Create Monitor:** Click **Create Monitor** to start tracking.

UptimeRobot will now alert you if the backend becomes unreachable.

## Local Development

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Running Both Services Currently
1. **Backend:**
   ```bash
   cd backend
   npm install
   npm run start
   ```
   (Runs on http://localhost:3000)

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   (Runs on http://localhost:5173 natively)
