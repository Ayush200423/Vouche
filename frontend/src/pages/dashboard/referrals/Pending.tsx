import { Button } from "@/components/ui/button";
import PageLayout from "@/components/utils/dashboard/PageLayout";
import {
  Referral,
  ReferralsTable,
} from "@/components/utils/dashboard/tables/ReferralsTable";
import { Link } from "react-router-dom";

const data: Referral[] = [
  {
    id: "referral-1",
    referrer: { id: "client-1", email: "john.doe@example.com" },
    referred: { id: "client-2", email: "jane.smith@example.com" },
    date: "2025-01-15T10:30:00",
    status: "pending appointment",
    rewards: "$10 gift card",
  },
  {
    id: "referral-2",
    referrer: { id: "client-3", email: "alice.jones@example.com" },
    referred: { id: "client-4", email: "bob.williams@example.com" },
    date: "2025-01-14T14:15:00",
    status: "pending approval",
    rewards: "15% discount",
  },
  {
    id: "referral-3",
    referrer: { id: "client-5", email: "charlie.brown@example.com" },
    referred: { id: "client-6", email: "daisy.roberts@example.com" },
    date: "2025-01-10T09:00:00",
    status: "pending appointment",
    rewards: "$20 gift card",
  },
  {
    id: "referral-4",
    referrer: { id: "client-7", email: "david.miller@example.com" },
    referred: { id: "client-8", email: "emily.davis@example.com" },
    date: "2025-01-05T11:45:00",
    status: "pending approval",
    rewards: "N/A",
  },
  {
    id: "referral-5",
    referrer: { id: "client-9", email: "frank.martin@example.com" },
    referred: { id: "client-10", email: "grace.johnson@example.com" },
    date: "2025-01-02T16:30:00",
    status: "pending appointment",
    rewards: "10% discount",
  },
];

const Pending = () => {
  return (
    <div>
      <PageLayout
        title="Pending Referrals"
        description="Active referrals that have not yet been fulfilled."
        nextPageButton={
          <div>
            <Link to="/dashboard/referrals/archived">
              <Button className="bg-[#088fa9]">Archived referrals</Button>
            </Link>
          </div>
        }
      />
      <ReferralsTable data={data} />
    </div>
  );
};

export default Pending;
