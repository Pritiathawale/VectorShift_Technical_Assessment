// toolbar.js

import { DraggableNode } from './draggableNode';


const NODE_DEFS = [
  { type: 'customInput', label: 'Input' },
  { type: 'llm', label: 'LLM' },
  { type: 'customOutput', label: 'Output' },
  { type: 'text', label: 'Text' },
  { type: 'math', label: 'Math' },
  { type: 'filter', label: 'Filter' },
  { type: 'api', label: 'API Request' },
  { type: 'conditional', label: 'Conditional' },
  { type: 'note', label: 'Note' },
];

export const PipelineToolbar = () => {

    return (
    <div className="vs-toolbar">
      {NODE_DEFS.map((n) => (
        <DraggableNode key={n.type} type={n.type} label={n.label} />
      ))}
    </div>
  );

    // return (
    //     <div style={{ padding: '10px' }}>
    //         <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
    //             <DraggableNode type='customInput' label='Input' />
    //             <DraggableNode type='llm' label='LLM' />
    //             <DraggableNode type='customOutput' label='Output' />
    //             <DraggableNode type='text' label='Text' />
    //             <DraggableNode type='math' label='Math' />
    //             <DraggableNode type='filter' label='Filter' />
    //             <DraggableNode type='api' label='API Request' />
    //             <DraggableNode type='conditional' label='Conditional' />
    //             <DraggableNode type='note' label='Note' />
    //         </div>
    //     </div>
    // );
};

