// submit.js

// export const SubmitButton = () => {

//     return (
//         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//             <button type="submit">Submit</button>
//         </div>
//     );
// }

import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';

const BACKEND_URL = 'http://localhost:8000/pipelines/parse';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Backend responded with status ${response.status}`);
      }

      const { num_nodes, num_edges, is_dag } = await response.json();

      alert(
        'Pipeline Analysis\n\n' +
        `Nodes: ${num_nodes}\n` +
        `Edges: ${num_edges}\n` +
        `Valid DAG: ${is_dag ? 'Yes' : 'No (contains a cycle)'}`
      );
    } catch (err) {
      if (err instanceof TypeError) {
        // fetch() rejects with a TypeError on network-level failures
        alert(
          'Could not reach the backend.\n\n' +
          'Make sure it is running:\ncd backend && uvicorn main:app --reload'
        );
      } else {
        alert(`Something went wrong: ${err.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="vs-submit-bar">
      <button
        type="button"
        className="vs-submit-btn"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? 'Submitting…' : 'Submit'}
      </button>
    </div>
  );
};

