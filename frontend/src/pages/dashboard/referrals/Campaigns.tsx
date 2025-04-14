import PageLayout from "@/components/utils/dashboard/PageLayout";
import { CampaignConfig } from "@/components/utils/dashboard/CampaignConfig";

const Campaigns = () => {
  return (
    <div className="h-full w-full">
      <PageLayout
        title="Campaigns"
        description="Manage your referral program."
      />

      <div className="w-[60%] px-[30px]">
        <CampaignConfig />
        <br />
      </div>
    </div>
  );
};

export default Campaigns;
