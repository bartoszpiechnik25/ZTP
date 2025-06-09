import HomeContent from "@/features/home/components/HomeContent";
import HomeNavigationMenu from "@/features/home/components/HomeNavigationMenu";
import HomeTodos from "@/features/home/components/HomeTodos";

function HomePage() {
  return (
    <div className="max-w-[1280px] mx-auto p-8 text-center pt-30">
      <HomeNavigationMenu />
      <HomeContent />
      <HomeTodos />
    </div>
  );
}

export default HomePage;
