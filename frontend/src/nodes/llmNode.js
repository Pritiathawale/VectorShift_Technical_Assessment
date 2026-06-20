// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id}) => {

   return (
    <BaseNode
      id={id}
      title="LLM"
      accent="var(--accent-llm)"
      description="This is an LLM."
      inputHandles={[
        { id: `${id}-system`, label: 'System' },
        { id: `${id}-prompt`, label: 'Prompt' },
      ]}
      outputHandles={[{ id: `${id}-response`, label: 'Response' }]}
    />
  );
};

