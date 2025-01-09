import React from "react";

interface AuthLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  leftContent,
  rightContent,
}) => {
  return (
    <div className="flex h-screen">
      <div className="w-[45%] bg-[#e6f1f7] flex items-center justify-center">
        {leftContent}
      </div>

      <div className="w-[55%] bg-white flex items-center justify-center">
        {rightContent}
      </div>
    </div>
  );
};

export default AuthLayout;
