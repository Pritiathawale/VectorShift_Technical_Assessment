import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'Contains');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      accent="var(--accent-filter)"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
      fields={[
        {
          name: 'condition',
          label: 'Condition',
          type: 'select',
          value: condition,
          options: ['Contains', 'Equals', 'Greater Than', 'Less Than'],
          onChange: (e) => setCondition(e.target.value),
        },
        {
          name: 'value',
          label: 'Value',
          type: 'text',
          value,
          onChange: (e) => setValue(e.target.value),
        },
      ]}
    />
  );
};