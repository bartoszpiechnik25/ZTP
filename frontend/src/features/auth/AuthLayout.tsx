import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
