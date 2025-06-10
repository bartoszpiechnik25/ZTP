import { motion } from "framer-motion";
import { H1 } from "@/shared/components/ui/typography/Headings";
import BrandButton from "@/shared/components/BrandButton";
import { CatDocLogo } from "@/shared/components/ui/CatDocLogo";
import { useNavigate } from "react-router";

const HomeContent = () => {
  const navigate = useNavigate();
  const onClickHandler = () => navigate("/sign-in");

  return (
    <div className="flex flex-3 bg-white m-16 flex-col gap-30">
      <CatDocLogo iconSize={24} containerClassName="items-center" textClassName="text-2xl" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }} className="space-y-20">
        <H1 className="text-primary leading-12">Say goodbye to document chaos.</H1>
        <H1 className="text-end text-primary leading-12">Effortless document management powered by AI 😻</H1>
      </motion.div>
      <BrandButton className="w-1/3 h-14 text-xl" onClick={onClickHandler} label="Get Started" />
    </div>
  );
};

export default HomeContent;
