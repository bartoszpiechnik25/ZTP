import { useTheme } from "@/app/providers/ThemeProvider";
import { Toaster } from "sonner";

const ToasterProvider = () => {
  const { theme } = useTheme();
  // TODO: Investigate theme style changes and consider replacing "sonner" Toaster with a "shadcn" alternative. (Ref: TODO-1234)
  return <Toaster expand theme={theme} richColors closeButton duration={100_000} style={{ fontFamily: "inherit" }} />;
};

export default ToasterProvider;
