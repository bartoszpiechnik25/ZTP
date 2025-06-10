import { Outlet } from "react-router";
import backgroundImage from "@/assets/images/background-documents.jpg";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="flex flex-3 flex-col items-center justify-center gap-4">
        <Outlet />
      </div>
      <div className="flex flex-2 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary"></div>
        <img
          src={backgroundImage}
          alt="background-documents"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
