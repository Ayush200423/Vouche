import React, { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  description: string;
  nextPageButton?: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  nextPageButton,
}) => {
  return (
    <div className="mx-4 mt-3 mb-2">
      <div className="h-full w-full flex items-center justify-between">
        <div className="text-xl font-medium mb-2">{title}</div>
        {nextPageButton}
      </div>
      <div className="text-sm text-[#71717a]">{description}</div>
    </div>
  );
};

export default PageLayout;
