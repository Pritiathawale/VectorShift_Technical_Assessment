# from fastapi import FastAPI, Form

# app = FastAPI()

# @app.get('/')
# def read_root():
#     return {'Ping': 'Pong'}

# @app.get('/pipelines/parse')
# def parse_pipeline(pipeline: str = Form(...)):
#     return {'status': 'parsed'}

from typing import Any, Dict, List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# The frontend (React dev server) and backend run on different ports/origins
# during local development, so the browser blocks the fetch() call unless
# the backend explicitly allows it.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineNode(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[Dict[str, Any]] = None

    class Config:
        extra = "allow"  # React Flow nodes also carry position, width, etc.


class PipelineEdge(BaseModel):
    id: str
    source: str
    target: str

    class Config:
        extra = "allow"  # sourceHandle, targetHandle, animated, markerEnd, etc.


class Pipeline(BaseModel):
    nodes: List[PipelineNode] = []
    edges: List[PipelineEdge] = []


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


def is_directed_acyclic_graph(nodes: List[PipelineNode], edges: List[PipelineEdge]) -> bool:
    """
    Standard 3-color DFS cycle detection.

    Each node is WHITE (unvisited), GRAY (currently on the DFS recursion
    stack -- i.e. an ancestor of the node we're exploring right now), or
    BLACK (fully explored, no cycle found through it).

    If a DFS from some node ever reaches a GRAY node, that edge points back
    to one of its own ancestors -- a "back edge" -- which means a cycle.
    Reaching a BLACK node is fine: that subtree was already proven
    cycle-free, so there's no need to re-explore it.
    """
    WHITE, GRAY, BLACK = 0, 1, 2

    adjacency: Dict[str, List[str]] = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in adjacency:
            adjacency[edge.source].append(edge.target)

    color: Dict[str, int] = {node.id: WHITE for node in nodes}

    def has_cycle_from(node_id: str) -> bool:
        color[node_id] = GRAY
        for neighbor in adjacency.get(node_id, []):
            if neighbor not in color:
                continue  # edge references a node that doesn't exist; ignore
            if color[neighbor] == GRAY:
                return True
            if color[neighbor] == WHITE and has_cycle_from(neighbor):
                return True
        color[node_id] = BLACK
        return False

    return not any(
        color[node.id] == WHITE and has_cycle_from(node.id) for node in nodes
    )


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_directed_acyclic_graph(pipeline.nodes, pipeline.edges),
    }
