import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/shared/components/ui/Menubar";
import { Link } from "react-router";

// Define the types for menu items
type MenuItem = {
  label: string;
  to?: string;
  onClick?: () => void;
  children?: (MenuItem | "separator")[];
};

// Props for the NavigationBar component
interface NavigationBarProps {
  items: MenuItem[];
  className?: string;
}

// Wrapper component for MenubarTrigger with Link
const LinkMenubarTrigger = ({ to, label, onClick }: { to?: string; label: string; onClick?: () => void }) => {
  if (to) {
    return (
      <MenubarTrigger asChild className="cursor-pointer">
        <Link to={to} className="w-full h-full block">
          {label}
        </Link>
      </MenubarTrigger>
    );
  }

  return (
    <MenubarTrigger onClick={onClick} className="cursor-pointer">
      {label}
    </MenubarTrigger>
  );
};

// Recursive component to render menu items
const RenderMenuItem = ({ item }: { item: MenuItem }) => {
  // If item has children, render a dropdown menu
  if (item.children && item.children.length > 0) {
    return (
      <MenubarMenu>
        <MenubarTrigger>{item.label}</MenubarTrigger>
        <MenubarContent>
          {item.children.map((child, index) => {
            if (child === "separator") {
              return <MenubarSeparator key={`separator-${index}`} />;
            }

            return (
              <MenubarItem key={`${child.label}-${index}`} asChild={!!child.to}>
                {child.to ? (
                  <Link to={child.to} className="w-full h-full block" onClick={child.onClick}>
                    {child.label}
                  </Link>
                ) : (
                  <div onClick={child.onClick}>{child.label}</div>
                )}
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    );
  }

  // If item doesn't have children, render a simple link
  return (
    <MenubarMenu>
      <LinkMenubarTrigger to={item.to} label={item.label} onClick={item.onClick} />
    </MenubarMenu>
  );
};

const NavigationBar = ({
  items,
  className = "w-fit bg-primary text-primary-foreground h-10 px-2",
}: NavigationBarProps) => {
  return (
    <Menubar className={className}>
      {items.map((item, index) => (
        <RenderMenuItem key={`${item.label}-${index}`} item={item} />
      ))}
    </Menubar>
  );
};

export default NavigationBar;
