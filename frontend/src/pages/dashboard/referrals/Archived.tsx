import { Button } from "@/components/ui/button";
import PageLayout from "@/components/utils/dashboard/PageLayout";
import {
  Referral,
  ReferralsTable,
} from "@/components/utils/dashboard/tables/ReferralsTable";
import { Link } from "react-router-dom";

const data: Referral[] = [
  {
    id: "referral-6",
    referrer: { id: "client-11", email: "helen.lee@example.com" },
    referred: { id: "client-12", email: "ian.king@example.com" },
    date: "2024-12-22T13:25:00",
    status: "cancelled",
    rewards: "$50 gift card",
  },
  {
    id: "c1f8a45e",
    referrer: { id: "client-13", email: "jackson.morris@example.com" },
    referred: { id: "client-14", email: "karen.clark@example.com" },
    date: "2024-12-18T14:10:00",
    status: "successful",
    rewards: "20% discount",
  },
  {
    id: "referral-8",
    referrer: { id: "client-15", email: "lucas.green@example.com" },
    referred: { id: "client-16", email: "mia.wilson@example.com" },
    date: "2024-12-05T11:50:00",
    status: "successful",
    rewards: "$30 gift card",
  },
  {
    id: "referral-9",
    referrer: { id: "client-17", email: "oliver.hall@example.com" },
    referred: { id: "client-18", email: "paula.martinez@example.com" },
    date: "2024-12-01T17:00:00",
    status: "cancelled",
    rewards: "$10 gift card",
  },
  {
    id: "referral-10",
    referrer: { id: "client-19", email: "quinn.evans@example.com" },
    referred: { id: "client-20", email: "rosa.perez@example.com" },
    date: "2024-11-28T14:30:00",
    status: "successful",
    rewards: "5% discount",
  },
];

const Archived = () => {
  return (
    <div>
      <PageLayout
        title="Archived Referrals"
        description="Fulfilled referrals that are no longer active."
        nextPageButton={
          <div>
            <Link to="/dashboard/referrals/pending">
              <Button className="bg-[#088fa9]">Active referrals</Button>
            </Link>
          </div>
        }
      />
      <ReferralsTable data={data} />
    </div>
  );
};

export default Archived;
