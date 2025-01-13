import PageLayout from "@/components/utils/dashboard/PageLayout";
import React from "react";

const Campaigns = () => {
  const data = [];

  return (
    <div className="h-full w-full">
      <PageLayout
        title="Campaigns"
        description="Manage your referral campaigns."
      />
    </div>
  );
};

export default Campaigns;
