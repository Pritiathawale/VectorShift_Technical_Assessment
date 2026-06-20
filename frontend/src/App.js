import { SubmitButton } from './submit';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  return (
   <div className="vs-app">
      <header className="vs-header">
        <div className="vs-brand">
          <span className="vs-brand-mark" />
          <span className="vs-brand-name">Pipeline Builder</span>
        </div>
      </header>

      <PipelineToolbar />

      <main className="vs-canvas-area">
        <PipelineUI />
        <SubmitButton />
      </main>
    </div>
  );
}

export default App;
