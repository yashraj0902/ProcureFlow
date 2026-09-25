# ProcureFlow

An innovation-procurement lifecycle platform that helps government departments discover eligible startups, run controlled pilots, measure outcomes and make evidence-based scale decisions.

## Quick Start

The entire application runs via Docker Compose.

```bash
cd ~/Projects/ProducreFlow
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
