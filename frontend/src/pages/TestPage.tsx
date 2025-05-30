import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Logo } from "@/shared/components/ui/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/DropdownMenu";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/shared/providers/ThemeProvider";

function TestPage() {
  const [count, setCount] = useState(0);
  const { setTheme } = useTheme();

  return (
    <div className="max-w-[1280px] mx-auto p-8 text-center pt-12">
      <Logo size="xl" />
      <div className="p-8 flex flex-row items-center justify-center gap-4 mx-auto">
        <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default TestPage;
