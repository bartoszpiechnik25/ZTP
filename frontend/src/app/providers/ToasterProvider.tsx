import { Toaster } from "sonner";

const ToasterProvider = () => {
  // TODO: Investigate theme style changes and consider replacing "sonner" Toaster with a "shadcn" alternative. (Ref: TODO-1234)
  return <Toaster expand richColors duration={4000} style={{ fontFamily: "inherit" }} />;
};

export default ToasterProvider;
