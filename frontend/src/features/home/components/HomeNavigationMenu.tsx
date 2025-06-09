import NavigationBar from "@/shared/components/NavigationBar";
import ThemeToggler from "@/shared/components/ThemeToggler";

const HomeNavigationMenu = () => {
  const navigationItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    {
      label: "Login",
      children: [
        { label: "Sign in", to: "/sign-in" },
        { label: "Sign up", to: "/sign-up" },
      ],
    },
  ];

  return (
    <div className="absolute top-4 right-4 flex flex-row items-center gap-1">
      <ThemeToggler />
      {/* TODO: use NavigationMenu from shadcn */}
      <NavigationBar items={navigationItems} />
    </div>
  );
};

export default HomeNavigationMenu;
