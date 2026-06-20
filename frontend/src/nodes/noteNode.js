import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || 'Add a note...');

  return (
    <BaseNode
      id={id}
      title="Note"
      accent="var(--accent-note)"
      fields={[
        {
          name: 'text',
          label: 'Note',
          type: 'textarea',
          value: text,
          rows: 3,
          onChange: (e) => setText(e.target.value),
        },
      ]}
    />
  );
};