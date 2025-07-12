import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button className="btn btn-outline">Default</button>
      <button className="btn btn-outline btn-primary">Primary</button>
      <button className="btn btn-outline btn-secondary">Secondary</button>
      <button className="btn btn-outline btn-accent">Accent</button>
    </div>
  );
}

export default App;
