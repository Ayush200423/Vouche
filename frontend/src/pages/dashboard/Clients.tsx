import PageLayout from "@/components/utils/dashboard/PageLayout";
import { ClientsTable } from "@/components/utils/dashboard/tables/ClientsTable";
import { DataContext } from "@/helpers/DataWrapper";
import { useContext } from "react";

const Clients = () => {
  const data = useContext(DataContext);
  return (
    <div>
      <PageLayout title="Clients" description="Manage your client referrals." />
      <ClientsTable data={data.clients} />
    </div>
  );
};

export default Clients;
