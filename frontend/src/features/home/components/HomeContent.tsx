import { Lead } from "@/shared/components/ui/typography/Paragraph";
import { Logo } from "@/shared/components/ui/Logo";

const HomeContent = () => {
  return (
    <div>
      <Logo size="xl" />
      <div className="p-10 flex flex-col items-center justify-center gap-4">
        <Lead>Say goodbye to document chaos.</Lead>
        <Lead>CatDoc brings intelligent, effortless document management powered by AI 😻</Lead>
      </div>
    </div>
  );
};

export default HomeContent;
