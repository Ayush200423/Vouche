import PageLayout from "@/components/utils/dashboard/PageLayout";
import {
  Reward,
  RewardsTable,
} from "@/components/utils/dashboard/tables/RewardsTable";

const data: Reward[] = [
  {
    id: "1",
    recipient: "john.doe@example.com",
    date_rewarded: "2025-01-15T14:30:00",
    reward_type: "gift card",
    amount: "$50",
    referral_id: "c1f8a45e",
  },
  {
    id: "2",
    recipient: "jane.smith@example.com",
    date_rewarded: "2025-01-12T09:15:00",
    reward_type: "manual",
    amount: "10%",
    referral_id: "c1f8a45e",
  },
  {
    id: "3",
    recipient: "michael.johnson@example.com",
    date_rewarded: "2025-01-25T16:45:00",
    reward_type: "gift card",
    amount: "$100",
    referral_id: "c1f8a45e",
  },
  {
    id: "4",
    recipient: "emily.davis@example.com",
    date_rewarded: "2025-01-08T11:30:00",
    reward_type: "manual",
    amount: "15%",
    referral_id: "c1f8a45e",
  },
  {
    id: "5",
    recipient: "chris.brown@example.com",
    date_rewarded: "2025-01-05T13:00:00",
    reward_type: "gift card",
    amount: "$75",
    referral_id: "c1f8a45e",
  },
];

const Rewards = () => {
  return (
    <div>
      <PageLayout
        title="Rewards"
        description="Collection of all of the referral rewards sent out."
      />
      <RewardsTable data={data} />
    </div>
  );
};

export default Rewards;
