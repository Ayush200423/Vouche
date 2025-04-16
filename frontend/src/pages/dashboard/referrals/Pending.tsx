import { Button } from "@/components/ui/button";
import PageLayout from "@/components/utils/dashboard/PageLayout";
import { ReferralsTable } from "@/components/utils/dashboard/tables/ReferralsTable";
import { DataContext } from "@/helpers/DataWrapper";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Pending = () => {
  const data = useContext(DataContext);

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
      <ReferralsTable data={data.pendingReferrals} />
    </div>
  );
};

export default Pending;
