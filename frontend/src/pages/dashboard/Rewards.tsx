import PageLayout from "@/components/utils/dashboard/PageLayout";
import { RewardsTable } from "@/components/utils/dashboard/tables/RewardsTable";

const Rewards = () => {
  return (
    <div>
      <PageLayout
        title="Rewards"
        description="A collection of all of the referral rewards sent out."
      />
      <RewardsTable />
    </div>
  );
};

export default Rewards;
