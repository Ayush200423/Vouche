import React, { ReactNode } from "react";
import { loadInitialData } from "./LoadInitialData";
import Loading from "@/components/utils/Loading";
import { Client } from "./types/ClientType";
import { PendingReferral } from "./types/ReferralType";
import { ArchivedReferral } from "./types/ReferralType";
import { Reward } from "./types/RewardType";

interface DataWrapperProps {
  children: ReactNode;
}

interface InitialData {
  clients: Client[];
  pendingReferrals: PendingReferral[];
  archivedReferrals: ArchivedReferral[];
  rewards: Reward[];
}

export const DataContext = React.createContext<InitialData>({
  clients: [],
  pendingReferrals: [],
  archivedReferrals: [],
  rewards: [],
});

const DataWrapper: React.FC<DataWrapperProps> = ({ children }) => {
  const { data, loading, error } = loadInitialData();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DataContext.Provider
      value={
        data || {
          clients: [],
          pendingReferrals: [],
          archivedReferrals: [],
          rewards: [],
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataWrapper;
