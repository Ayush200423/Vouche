import { Button } from "@/components/ui/button";
import PageLayout from "@/components/utils/dashboard/PageLayout";
import { ReferralsTable } from "@/components/utils/dashboard/tables/ReferralsTable";
import { DataContext } from "@/helpers/DataWrapper";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Archived = () => {
  const data = useContext(DataContext);

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
      <ReferralsTable data={data.archivedReferrals} />
    </div>
  );
};

export default Archived;
