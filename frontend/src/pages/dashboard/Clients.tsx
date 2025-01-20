import PageLayout from "@/components/utils/dashboard/PageLayout";
import { ClientsTable } from "@/components/utils/dashboard/tables/ClientsTable";
import { Client } from "@/helpers/types/ClientType";
import { clients } from "@/helpers/types/testData";

const data: Client[] = clients;

const Clients = () => {
  return (
    <div>
      <PageLayout title="Clients" description="Manage your client referrals." />
      <ClientsTable data={data} />
    </div>
  );
};

export default Clients;
