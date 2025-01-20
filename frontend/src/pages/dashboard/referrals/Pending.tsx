import { Button } from "@/components/ui/button";
import PageLayout from "@/components/utils/dashboard/PageLayout";
import { ReferralsTable } from "@/components/utils/dashboard/tables/ReferralsTable";
import { clients, pending_referrals } from "@/helpers/types/testData";
import { Link } from "react-router-dom";

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
      <ReferralsTable data={pending_referrals} />
    </div>
  );
};

export default Pending;
