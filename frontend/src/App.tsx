import { useState } from "react";
import { Button } from "@/features/shared/components/ui/Button";
import { H1, P } from "./features/shared/components/ui/Typography";
import { Logo } from "./features/shared/components/ui/Logo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-[1280px] mx-auto p-8 text-center">
      <Logo />
      <H1 className="text-3xl font-bold my-4">Vite + React</H1>
      <div className="p-8">
        <Button onClick={() => setCount((count) => count + 1)} className="mb-4">
          count is {count}
        </Button>
        <P className="mb-4">
          Edit <P className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">src/App.tsx</P> and save to
          test HMR
        </P>
      </div>
      <P className="text-gray-400">Click on the Vite and React logos to learn more</P>
    </div>
  );
}

export default App;
