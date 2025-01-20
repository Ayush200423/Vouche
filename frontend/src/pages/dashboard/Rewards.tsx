import PageLayout from "@/components/utils/dashboard/PageLayout";
import { RewardsTable } from "@/components/utils/dashboard/tables/RewardsTable";
import { rewards } from "@/helpers/types/testData";

const Rewards = () => {
  return (
    <div>
      <PageLayout
        title="Rewards"
        description="Collection of all of the referral rewards sent out."
      />
      <RewardsTable data={rewards} />
    </div>
  );
};

export default Rewards;
