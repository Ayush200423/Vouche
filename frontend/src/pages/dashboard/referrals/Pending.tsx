import { Button } from "@/components/ui/button";
import PageLayout from "@/components/utils/dashboard/PageLayout";
import {
  Referral,
  ReferralsTable,
} from "@/components/utils/dashboard/tables/ReferralsTable";
import { clients } from "@/helpers/types/testData";
import { Link } from "react-router-dom";

const data: Referral[] = [];

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
