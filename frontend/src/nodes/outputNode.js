// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  // const handleNameChange = (e) => {
    // setCurrName(e.target.value);
  // };
// 
  // const handleTypeChange = (e) => {
    // setOutputType(e.target.value);
  // };


   return (
    <BaseNode
      id={id}
      title="Output"
      accent="var(--accent-output)"
      inputHandles={[{ id: `${id}-value` }]}
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
          value: outputType,
          options: ['Text', 'Image'],
          onChange: (e) => setOutputType(e.target.value),
        },
      ]}
    />
  );
};