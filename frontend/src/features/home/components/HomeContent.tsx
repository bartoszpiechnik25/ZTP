import { Lead } from "@/shared/components/ui/typography/Paragraph";
import { CatDocLogo } from "@/shared/components/ui/CatDocLogo";
import { motion } from "motion/react";

import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/shared/components/ui/NavigationMenu";

const HomeContent = () => {
  return (
    <div>
      <div className="p-10 flex flex-col items-center justify-center gap-8">
        <CatDocLogo />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}>
          <Lead>Say goodbye to document chaos.</Lead>
          <Lead>CatDoc brings intelligent, effortless document management powered by AI 😻</Lead>
        </motion.div>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/docs">Docs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default HomeContent;
