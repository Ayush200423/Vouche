import { Button } from "@/components/ui/button";
import PageLayout from "@/components/utils/dashboard/PageLayout";
import {
  Referral,
  ReferralsTable,
} from "@/components/utils/dashboard/ReferralsTable";
import { Link } from "react-router-dom";

const data: Referral[] = [
  {
    id: "8045ee30",
    date: "2007-12-19T16:20:39",
    referrer: "danielle34@heath-fields.com",
    referred: "moralesstephen@gmail.com",
    status: "pending appointment",
    rewards: "$17 off",
  },
  {
    id: "4fad3ba3",
    date: "1995-10-10T04:10:09",
    referrer: "ulittle@bowman.com",
    referred: "jasoncarney@rhodes.net",
    status: "pending appointment",
    rewards: "$31 off",
  },
  {
    id: "8045ee30",
    date: "2007-12-19T16:20:39",
    referrer: "danielle34@heath-fields.com",
    referred: "moralesstephen@gmail.com",
    status: "pending appointment",
    rewards: "$17 off",
  },
  {
    id: "4fad3ba3",
    date: "1995-10-10T04:10:09",
    referrer: "ulittle@bowman.com",
    referred: "jasoncarney@rhodes.net",
    status: "pending appointment",
    rewards: "$31 off",
  },
  {
    id: "8045ee30",
    date: "2007-12-19T16:20:39",
    referrer: "danielle34@heath-fields.com",
    referred: "moralesstephen@gmail.com",
    status: "pending appointment",
    rewards: "$17 off",
  },
  {
    id: "a4d1c08f",
    date: "2011-08-14T14:07:59",
    referrer: "mary02@fox.com",
    referred: "lhamilton@hotmail.com",
    status: "pending approval",
    rewards: "$17 off",
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
