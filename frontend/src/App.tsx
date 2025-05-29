import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./features/shared/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-[1280px] mx-auto p-8 text-center">
      <div className="flex justify-center gap-8">
        <a href="https://vite.dev" target="_blank" className="group">
          <img
            src={viteLogo}
            className="h-24 p-6 transition-filter duration-300 group-hover:drop-shadow-[0_0_0.5em_rgba(100,108,255,0.67)]"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" className="group">
          <img
            src={reactLogo}
            className="h-24 p-6 transition-filter duration-300 animate-[spin_20s_linear_infinite] group-hover:drop-shadow-[0_0_0.5em_rgba(97,218,251,0.67)]"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-3xl font-bold my-4">Vite + React</h1>
      <div className="p-8">
        <Button onClick={() => setCount((count) => count + 1)} className="mb-4">
          count is {count}
        </Button>
        <p className="mb-4">
          Edit <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">src/App.tsx</code> and save
          to test HMR
        </p>
      </div>
      <p className="text-gray-400">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
