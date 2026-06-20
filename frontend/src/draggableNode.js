// draggableNode.js


const ACCENTS = {
  customInput: 'var(--accent-input)',
  llm: 'var(--accent-llm)',
  customOutput: 'var(--accent-output)',
  text: 'var(--accent-text)',
  math: 'var(--accent-math)',
  filter: 'var(--accent-filter)',
  api: 'var(--accent-api)',
  conditional: 'var(--accent-conditional)',
  note: 'var(--accent-note)',
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="vs-chip"
      style={{ '--chip-accent': ACCENTS[type] || 'var(--accent-input)' }}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span className="vs-chip-dot" />
      <span className="vs-chip-label">{label}</span>
    </div>
  );
};

