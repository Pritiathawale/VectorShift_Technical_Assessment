// // inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

console.log("BaseNode =", BaseNode);

// export const InputNode = () => {
  // return <div>Test</div>;
// };
export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

    return (
    <BaseNode
      id={id}
      title="Input"
      accent="var(--accent-input)"
      outputHandles={[{ id: `${id}-value` }]}
      fields={[
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          value: currName,
          onChange: (e) => setCurrName(e.target.value),
        },
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          value: inputType,
          options: ['Text', 'File'],
          onChange: (e) => setInputType(e.target.value),
        },
      ]}
    />
  );
};