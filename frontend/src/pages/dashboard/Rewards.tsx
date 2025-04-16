import PageLayout from "@/components/utils/dashboard/PageLayout";
import { RewardsTable } from "@/components/utils/dashboard/tables/RewardsTable";
import { DataContext } from "@/helpers/DataWrapper";
import { useContext } from "react";

const Rewards = () => {
  const data = useContext(DataContext);
  return (
    <div>
      <PageLayout
        title="Rewards"
        description="Collection of all of the referral rewards sent out."
      />
      <RewardsTable data={data?.rewards || []} />
    </div>
  );
};

export default Rewards;
