import HomeBackground from "@/features/home/components/HomeBackground";
import HomeContent from "@/features/home/components/HomeContent";

const HomePage = () => {
  return (
    <div className="w-full h-screen flex flex-row">
      <HomeContent />
      <HomeBackground />
    </div>
  );
};
export default HomePage;
