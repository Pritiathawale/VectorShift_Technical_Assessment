# Pipeline Builder

## Overview

This project is a visual pipeline builder developed using React Flow, Zustand, FastAPI, and React.

Users can create pipelines by dragging nodes onto a canvas, connecting them, and submitting the graph for analysis.

## Features

* Reusable BaseNode abstraction
* Input Node
* Output Node
* LLM Node
* Text Node
* Math Node
* Filter Node
* API Request Node
* Conditional Node
* Note Node
* Dynamic variable detection in Text Nodes
* Automatic Text Node resizing
* DAG validation
* Node and edge counting
* Backend integration with FastAPI
* Modern dark-themed UI

## Tech Stack

Frontend:

* React
* React Flow
* Zustand

Backend:

* FastAPI
* Pydantic

## Running the Project

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Backend Endpoint

POST /pipelines/parse

Returns:

* Number of nodes
* Number of edges
* DAG status

## Author

Priti Athawale
