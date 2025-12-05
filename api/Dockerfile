FROM python:3.14-slim

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev

COPY pyproject.toml poetry.lock* /app/

RUN pip install poetry
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi

COPY app /app/app

EXPOSE 8000

CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
