import { Button } from "@/components/ui/button";
import PageLayout from "@/components/utils/dashboard/PageLayout";
import { ReferralsTable } from "@/components/utils/dashboard/tables/ReferralsTable";
import { archived_referrals } from "@/helpers/types/testData";
import { Link } from "react-router-dom";

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
      <ReferralsTable data={archived_referrals} />
    </div>
  );
};

export default Archived;
