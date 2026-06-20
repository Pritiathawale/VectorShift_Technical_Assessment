import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API Request"
      accent="var(--accent-api)"
      inputHandles={[{ id: `${id}-payload`, label: 'Payload' }]}
      outputHandles={[{ id: `${id}-response`, label: 'Response' }]}
      fields={[
        {
          name: 'method',
          label: 'Method',
          type: 'select',
          value: method,
          options: ['GET', 'POST', 'PUT', 'DELETE'],
          onChange: (e) => setMethod(e.target.value),
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          value: url,
          placeholder: 'https://api.example.com',
          onChange: (e) => setUrl(e.target.value),
        },
      ]}
    />
  );
};