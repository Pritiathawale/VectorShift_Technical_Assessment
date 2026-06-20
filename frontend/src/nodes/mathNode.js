import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'Add');

  return (
    <BaseNode
      id={id}
      title="Math"
      accent="var(--accent-math)"
      inputHandles={[
        { id: `${id}-a`, label: 'A' },
        { id: `${id}-b`, label: 'B' },
      ]}
      outputHandles={[{ id: `${id}-result`, label: 'Result' }]}
      fields={[
        {
          name: 'operation',
          label: 'Operation',
          type: 'select',
          value: operation,
          options: ['Add', 'Subtract', 'Multiply', 'Divide'],
          onChange: (e) => setOperation(e.target.value),
        },
      ]}
    />
  );
};