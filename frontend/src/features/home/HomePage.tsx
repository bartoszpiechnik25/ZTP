import HomeContent from "@/features/home/components/HomeContent";
import HomeNavBar from "@/features/home/components/HomeNavBar";
import HomeTodos from "@/features/home/components/HomeTodos";

function HomePage() {
  return (
    <div className="max-w-[1280px] mx-auto p-8 text-center pt-30">
      <HomeNavBar />
      <HomeContent />
      <HomeTodos />
    </div>
  );
}

export default HomePage;
