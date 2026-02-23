# Voting Application

A full-stack web application for creating and managing a single question poll. Built with Node.js, Express, SQLite, React, Vite, TailwindCSS v4, and shadcn-ui.

## Features

- **Vote:** Users can vote on options but are prevented from double voting using a combination of IP address tracking and a persistent cookie footprint.
- **View Results:** Real-time (auto-refreshed) view of the current poll standings with animated progress bars.
- **Admin Panel:** A standalone, premium control panel at `/admin` for resetting the poll safely using a secure token. Decoupled from the main React app.
- **System Monitor:** A real-time, standalone monitoring dashboard at `/monitor` displaying process uptime, memory usage, and application statistics.
- **Health Check:** A monitoring-friendly endpoint at `/health` returning system and application status.

## Directory Structure

- `frontend/`: The React + Vite application with TailwindCSS and shadcn-ui components.
- `backend/`: The Node.js Express server acting as the REST API and interfacing with SQLite.

## Deployment on Render.com

You can deploy this application on Render.com in a few different ways. Here is the recommended approach to deploy the frontend as a Static Site and the backend as a Web Service.

> **Important Note about SQLite on Render:**
> Standard Render Web Services use an ephemeral file system. This means that every time the backend service restarts or redeploys, your `poll.sqlite` database file will be wiped clean and reset to zero. To preserve data across restarts, you need to use a **Render Disk** (which requires a paid plan). Alternatively, you must switch your database from SQLite to PostgreSQL (which Render provides).

### 1. Deploying the Backend (Web Service)
1. Go to your Render Dashboard and click **New > Web Service**.
2. Connect your GitHub repository.
3. Configure the following settings:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add the following **Environment Variables**:
   - `ADMIN_RESET_TOKEN`: (Enter a secure string you will use for resetting)
   - `CORS_ORIGIN`: (Set this after deploying the frontend, e.g., `https://your-frontend.onrender.com`)

### 2. Deploying the Frontend (Static Site)
1. Go to your Render Dashboard and click **New > Static Site**.
2. Connect your GitHub repository.
3. Configure the following settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. In your frontend codebase, you will need to update the API fetch URLs to point to your new Backend Web Service URL (e.g., `https://your-backend.onrender.com/api/vote` instead of `/api/vote`). You can do this by using environment variables (`import.meta.env.VITE_API_URL`) in Vite.

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
