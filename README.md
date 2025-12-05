# Task Tracker

A full-stack task tracking application with FastAPI backend and React frontend.

## Demo Video

[Watch the demo video here] https://www.loom.com/share/5ef598ab593e4328aa9ba7c2e4295129

## Prerequisites

- Python 3.14+
- Node.js and npm
- Docker and Docker Compose (for Docker setup)
- Poetry (for Python dependency management)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:1234@localhost:5432/task-tracker
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_DB=task-tracker

# Security
SECRET_KEY=your-secret-key-here-change-in-production
```

**Note:** Change the `SECRET_KEY` to a secure random string in production. You can generate one using:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

## Local Setup

### Backend (API)

1. Navigate to the API directory:
   ```bash
   cd api
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install Poetry:
   ```bash
   pip install poetry
   ```

5. Install dependencies:
   ```bash
   poetry install
   ```

6. Navigate to the src folder:
   ```bash
   cd src
   ```

7. Run the development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

The API will be available at `http://localhost:8000`

### Frontend (UI)

1. Navigate to the UI directory:
   ```bash
   cd ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:5173` (or the port configured in your Vite config)

## Docker Compose Setup

1. Ensure you have a `.env` file in the root directory with the required environment variables (see above).

2. Run Docker Compose:
   ```bash
   docker-compose up
   ```

   Or to run in detached mode:
   ```bash
   docker-compose up -d
   ```

3. The services will be available at:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000`
   - PostgreSQL Database: `localhost:5432`

4. To stop the services:
   ```bash
   docker-compose down
   ```

   To stop and remove volumes (this will delete the database data):
   ```bash
   docker-compose down -v
   ```

## Project Structure

```
task-tracker/
├── api/                 # FastAPI backend
│   ├── src/
│   │   ├── api/        # Application code
│   │   └── main.py     # Application entry point
│   ├── pyproject.toml  # Poetry dependencies
│   └── Dockerfile
├── ui/                  # React frontend
│   ├── src/            # Source code
│   ├── package.json    # npm dependencies
│   └── Dockerfile
├── docker-compose.yml  # Docker orchestration
└── .env                # Environment variables (create this)
```

## Development

- Backend API documentation (Swagger UI): `http://localhost:8000/docs`
- Backend API alternative docs (ReDoc): `http://localhost:8000/redoc`
