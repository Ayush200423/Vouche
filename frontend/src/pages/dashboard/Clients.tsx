import PageLayout from "@/components/utils/dashboard/PageLayout";
import {
  Client,
  ClientsTable,
} from "@/components/utils/dashboard/tables/ClientsTable";

const data: Client[] = [
  {
    id: "1",
    client: "alice@email.com",
    referral_link: "https://app.com/ref/12345",
    total_referrals: 1,
    referrals_made: ["c1f8a45e"],
  },
  {
    id: "3",
    client: "charlie@email.com",
    referral_link: "https://app.com/ref/11111",
    total_referrals: 1,
    referrals_made: ["d3g4h891"],
  },
  {
    id: "5",
    client: "eve@email.com",
    referral_link: "https://app.com/ref/33333",
    total_referrals: 1,
    referrals_made: ["h7k8l234"],
  },
];

const Clients = () => {
  return (
    <div>
      <PageLayout title="Clients" description="Manage your clients." />
      <ClientsTable data={data} />
    </div>
  );
};

export default Clients;
