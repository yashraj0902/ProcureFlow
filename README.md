# ProcureFlow

An innovation-procurement lifecycle platform that helps government departments discover eligible startups, run controlled pilots, measure outcomes and make evidence-based scale decisions.

## Quick Start

The entire application runs via Docker Compose.

```bash
cd ~/Projects/ProcureFlow
docker-compose up --build
```

Wait a few moments for the database to initialize and the backend to run migrations and seed data.

## Access

* **Frontend**: `http://localhost:5173`
* **Backend API**: `http://localhost:8000/docs`

## Demo Accounts

* **Government**: `government@procureflow.demo`
* **Startup**: `startup@procureflow.demo`

**Password for all demo accounts**: `procureflow`

## End-to-End Flow

1. Log in as Government.
2. View Dashboard.
3. Create a Challenge.
4. Log out and Log in as Startup to view Recommended Challenges.

## Required Environment Variables

For deployment, you must supply the following environment variables. **Do NOT commit real production secrets to Git.**

* `LLM_API_KEY`: Required for the AI KPI Recommendation Engine to function.
* `LLM_MODEL`: Defines which LLM to use (e.g., `gemini-pro`).
* `DATABASE_URL`: The PostgreSQL connection string for the backend. In `docker-compose.yml`, this is currently hardcoded for local use and MUST be overridden in production.
* `JWT_SECRET`: Used to sign authentication tokens. The current value (`supersecretjwtkey_for_demo`) is strictly for demo purposes and MUST be replaced with a strong, randomly generated string in production.
* `FRONTEND_URL`: The URL where the frontend is hosted, used by the backend for CORS (e.g., `https://app.procureflow.example`).
* `VITE_API_URL`: The URL where the backend is hosted, required by the frontend build to correctly route API requests.

See `.env.example` for a template.
