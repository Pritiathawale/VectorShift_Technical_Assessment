// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useCallback, useRef, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { ApiNode } from './nodes/apiNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { FilterNode } from './nodes/filterNode';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { MathNode } from './nodes/mathNode';
import { NoteNode } from './nodes/noteNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { useStore } from './store';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  filter: FilterNode,
  api: ApiNode,
  conditional: ConditionalNode,
  note: NoteNode,
};

const ACCENT_HEX = {
  customInput: '#34d399',
  llm: '#c084fc',
  customOutput: '#60a5fa',
  text: '#fbbf24',
  math: '#fb923c',
  filter: '#2dd4bf',
  api: '#38bdf8',
  conditional: '#f472b6',
  note: '#9ca3af',
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} className="vs-canvas">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                fitView
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap
                    nodeColor={(n) => ACCENT_HEX[n.type] || '#5b6478'}
                    nodeStrokeWidth={0}
                    maskColor="rgba(12, 14, 19, 0.7)"
                />
            </ReactFlow>
        </div>
        </>
    )
}
