import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      title="Conditional"
      accent="var(--accent-conditional)"
      inputHandles={[{ id: `${id}-value` }]}
      outputHandles={[
        { id: `${id}-true`, label: 'True' },
        { id: `${id}-false`, label: 'False' },
      ]}
      fields={[
        {
          name: 'condition',
          label: 'If',
          type: 'text',
          value: condition,
          placeholder: 'e.g. x > 10',
          onChange: (e) => setCondition(e.target.value),
        },
      ]}
    />
  );
};