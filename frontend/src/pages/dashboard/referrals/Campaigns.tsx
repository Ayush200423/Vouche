import PageLayout from "@/components/utils/dashboard/PageLayout";
import { CampaignConfig } from "@/components/utils/dashboard/CampaignConfig";

const Campaigns = () => {
  return (
    <div className="h-full w-full">
      <PageLayout
        title="Campaigns"
        description="Manage your referral program."
      />

      <div className="flex justify-center w-full">
        <div className="w-full max-w-2xl">
          <CampaignConfig />
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
