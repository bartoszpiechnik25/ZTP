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
import { useTheme } from "@/app/providers/ThemeProvider";
import { Lead } from "@/shared/components/ui/typography/Paragraph";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/shared/components/ui/Menubar";
import { Link } from "react-router";

function HomePage() {
  const [count, setCount] = useState(0);
  const { setTheme } = useTheme();

  return (
    <div className="max-w-[1280px] mx-auto p-8 text-center pt-30">
      <Logo size="xl" />
      <div className="p-10 flex flex-col items-center justify-center gap-4">
        <Lead>Say goodbye to document chaos.</Lead>
        <Lead>CatDoc brings intelligent, effortless document management powered by AI 😻</Lead>
      </div>
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
      <div>
        <Menubar className="mx-auto w-fit mt-4">
          <MenubarMenu>
            <MenubarTrigger>
              <Link to="/">Home</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Link to="/about">About</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Log in</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link to="/sign-in">Sign in</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="/sign-up">Sign up</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Documents</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link to="/documents">All documents</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Link to="/documents/1">Document 1</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="/documents/2">Document 2</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="/documents/3">Document 3</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Link to="/not-found">Not Found</Link>
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}

export default HomePage;
