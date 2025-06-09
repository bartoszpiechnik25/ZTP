import { Toaster } from "sonner";

const ToasterProvider = () => {
  // It uses Toaster from sonner. Check theme style changing. Consider using a shadcn one.
  return <Toaster expand richColors duration={4000} style={{ fontFamily: "inherit" }} />;
};

export default ToasterProvider;
