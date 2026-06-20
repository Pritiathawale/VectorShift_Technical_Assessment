// textNode.js

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BaseNode } from './BaseNode';


const VARIABLE_PATTERN = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVariables(text) {
  const seen = new Set();
  const names = [];
  let match;
  VARIABLE_PATTERN.lastIndex = 0;
  while ((match = VARIABLE_PATTERN.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      names.push(match[1]);
    }
  }
  return names;
}

const MIN_WIDTH = 240;
const MAX_WIDTH = 460;
const HORIZONTAL_CHROME = 64; // textarea padding + border + node-body padding



export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(MIN_WIDTH);


  const variables = useMemo(() => extractVariables(text), [text]);
  const inputHandles = useMemo(
    () => variables.map((name) => ({ id: `${id}-${name}`, label: name })),
    [variables, id]
  );


   useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  useLayoutEffect(() => {
    if (!canvasRef.current) canvasRef.current = document.createElement('canvas');
    const ctx = canvasRef.current.getContext('2d');
    ctx.font = '12.5px JetBrains Mono, SF Mono, Consolas, monospace';

    const longestLine = text
      .split('\n')
      .reduce((max, line) => Math.max(max, ctx.measureText(line).width), 0);

    const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, longestLine + HORIZONTAL_CHROME));
    setWidth(next);
  }, [text]);


  // const handleTextChange = (e) => {
    // setCurrText(e.target.value);
  // };
//

 return (
    <BaseNode
      id={id}
      title="Text"
      accent="var(--accent-text)"
      width={width}
      inputHandles={inputHandles}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <label className="vs-field">
        <span className="vs-field-label">Text</span>
        <textarea
          ref={textareaRef}
          className="vs-input vs-textarea"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type {{variableName}} to add an input"
        />
      </label>
      </BaseNode>
  );
};
