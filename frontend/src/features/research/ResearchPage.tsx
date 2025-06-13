import api from "@/app/axiosClient";
import TestContent from "@/features/research/components/TestContent";
import TestNavigationMenu from "@/features/research/components/TestNavigationMenu";
import TestTodos from "@/features/research/components/TestTodos";
import BrandButton from "@/shared/components/BrandButton";

const ResearchPage = () => {
  return (
    <div>
      <div>ResearchPage</div>
      <p>This is the research page of the application.</p>
      <BrandButton onClick={() => api.get("/test")} label="Test endpoint" />
      <div className="max-w-[1280px] mx-auto p-8 text-center pt-30">
        <TestNavigationMenu />
        <TestContent />
        <TestTodos />
      </div>
    </div>
  );
};

export default ResearchPage;
