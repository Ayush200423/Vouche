import { useContext } from "react";
import { DataContext } from "../../../helpers/DataWrapper";
import PageLayout from "@/components/utils/dashboard/PageLayout";
import { ReferralsTable } from "@/components/utils/dashboard/tables/ReferralsTable";
import { AddReferral } from "@/components/utils/dashboard/AddReferral";

export default function Pending() {
  const { pendingReferrals } = useContext(DataContext);

  return (
    <div>
      <PageLayout
        title="Pending Referrals"
        description="Active referrals that have not yet been fulfilled."
        nextPageButton={
          <div>
            <AddReferral />

            {/* <Link to="/dashboard/referrals/archived">
              <Button className="bg-[#088fa9]">Archived referrals</Button>
            </Link> */}
          </div>
        }
      />
      <ReferralsTable data={pendingReferrals} />
    </div>
  );
}
