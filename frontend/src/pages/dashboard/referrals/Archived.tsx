import { Button } from "@/components/ui/button";
import PageLayout from "@/components/utils/dashboard/PageLayout";
import {
  Referral,
  ReferralsTable,
} from "@/components/utils/dashboard/tables/ReferralsTable";
import { Link } from "react-router-dom";

const data: Referral[] = [
  {
    id: "c1f8a45e",
    date: "2024-11-10T12:34:56",
    referrer: "john.doe@gmail.com",
    referred: "jane.smith@yahoo.com",
    status: "successful",
    rewards: "$25 off",
  },
  {
    id: "f2e3b567",
    date: "2023-06-15T09:12:34",
    referrer: "alice.wonderland@outlook.com",
    referred: "bob.builder@gmail.com",
    status: "cancelled",
    rewards: "$10 off",
  },
  {
    id: "d3g4h891",
    date: "2025-01-08T16:45:12",
    referrer: "emma.johnson@gmail.com",
    referred: "harry.potter@hogwarts.com",
    status: "successful",
    rewards: "$30 off",
  },
  {
    id: "g5i6j901",
    date: "2024-09-21T14:20:30",
    referrer: "lucy.liu@hotmail.com",
    referred: "clark.kent@dailyplanet.com",
    status: "cancelled",
    rewards: "$15 off",
  },
  {
    id: "h7k8l234",
    date: "2024-02-13T10:00:00",
    referrer: "bruce.wayne@wayneenterprises.com",
    referred: "diana.prince@amazon.com",
    status: "successful",
    rewards: "$20 off",
  },
  {
    id: "i9m0n456",
    date: "2023-12-05T08:22:18",
    referrer: "tony.stark@starkindustries.com",
    referred: "steve.rogers@shield.gov",
    status: "cancelled",
    rewards: "$12 off",
  },
  {
    id: "j1o2p678",
    date: "2024-07-19T18:55:45",
    referrer: "natasha.romanoff@avengers.com",
    referred: "bruce.banner@avengers.com",
    status: "successful",
    rewards: "$40 off",
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
