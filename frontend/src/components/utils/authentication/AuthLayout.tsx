import React from "react";

interface AuthLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  shade: `#${string}`;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  leftContent,
  rightContent,
  shade,
}) => {
  return (
    <div className="flex h-screen">
      <div className={`w-[45%] flex bg-[${shade}] items-center justify-center`}>
        {leftContent}
      </div>

      <div className={`w-[55%] bg-white flex items-center justify-center`}>
        {rightContent}
      </div>
    </div>
  );
};

export default AuthLayout;
