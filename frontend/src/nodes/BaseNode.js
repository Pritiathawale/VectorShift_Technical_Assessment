// BaseNode.js
//
// Shared shell for every node in the pipeline. Instead of each node file
// re-implementing its own container, header, and Handle placement, a node
// type just describes itself declaratively (title, accent color, fields,
// handles) and BaseNode does the rendering.
//
// This means adding a brand new node type is usually just a ~10-15 line
// file -- see nodes/mathNode.js, nodes/filterNode.js, etc. for examples.

import { Handle, Position } from 'reactflow';

// Evenly distributes `count` handles down the left or right edge of a node.
// 1 handle sits at 50%, 2 handles sit at 33%/66%, etc.
const handleTop = (index, count) => `${((index + 1) / (count + 1)) * 100}%`;

const Field = ({ field }) => {
  const { label, type, value, onChange, options, placeholder, rows } = field;

  return (
    <label className="vs-field">
      <span className="vs-field-label">{label}</span>
      {type === 'select' ? (
        <select className="vs-input" value={value} onChange={onChange}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          className="vs-input vs-textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 2}
        />
      ) : (
        <input
          className="vs-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </label>
  );
};

const HandleRow = ({ handle, index, count, type }) => {
  const top = handleTop(index, count);
  const isTarget = type === 'target';
 
  return (
    <>
      <Handle
        type={type}
        position={isTarget ? Position.Left : Position.Right}
        id={handle.id}
        title={handle.label}
        className="vs-handle"
        style={{ top }}
      />
      {handle.label && (
        <span
          className={`vs-handle-label ${isTarget ? 'vs-handle-label--left' : 'vs-handle-label--right'}`}
          style={{ top }}
        >
          {handle.label}
        </span>
      )}
    </>
  );
};

/**
 * @param {string} id - node id (from React Flow)
 * @param {string} title - header label, e.g. "Input"
 * @param {string} accent - a CSS color (usually a var(--accent-x) token)
 * @param {string} [description] - short static caption under the header (e.g. LLM node)
 * @param {{id: string, label?: string}[]} [inputHandles] - target handles on the left edge
 * @param {{id: string, label?: string}[]} [outputHandles] - source handles on the right edge
 * @param {object[]} [fields] - declarative form fields rendered in the body
 * @param {React.ReactNode} [children] - optional custom content (used when a
 *        node needs behavior beyond simple fields, e.g. TextNode's dynamic handles)
 * @param {number} [width] - card width in px
 */
export const BaseNode = ({
  id,
  title,
  accent = 'var(--accent-input)',
  description,
  inputHandles = [],
  outputHandles = [],
  fields = [],
  children,
  width = 240,
}) => {
  return (
    <div className="vs-node" style={{ width, '--node-accent': accent }}>
      {inputHandles.map((h, i) => (
        <HandleRow key={h.id} handle={h} index={i} count={inputHandles.length} type="target" />
      ))}

      <div className="vs-node-header">
        <span className="vs-node-dot" />
        <span className="vs-node-title">{title}</span>
      </div>

      {description && <div className="vs-node-description">{description}</div>}

      {(fields.length > 0 || children) && (
        <div className="vs-node-body">
          {fields.map((f) => (
            <Field key={f.name} field={f} />
          ))}
          {children}
        </div>
      )}

      {outputHandles.map((h, i) => (
        <HandleRow key={h.id} handle={h} index={i} count={outputHandles.length} type="source" />
      ))}
    </div>
  );
};
