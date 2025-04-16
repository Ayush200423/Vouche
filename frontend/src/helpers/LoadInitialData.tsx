import { Client } from "./types/ClientType";
import { PendingReferral, ArchivedReferral } from "./types/ReferralType";
import { Reward } from "./types/RewardType";
import { useState, useEffect } from "react";
import supabase from "./SupabaseAuth";

interface InitialData {
  clients: Client[];
  pendingReferrals: PendingReferral[];
  archivedReferrals: ArchivedReferral[];
  rewards: Reward[];
}

interface ClientResponse {
  id: string;
  contact: string;
  referral_link: string;
}

interface ReferralResponse {
  id: string;
  referrer: string;
  referred: string;
  date: string;
  status: string;
  campaign: string;
}

interface RewardResponse {
  id: string;
  recipient: string;
  referral: string;
  date: string;
  rewardtype: string;
  rewardvalue: string;
  status: string;
}

export const loadInitialData = () => {
  const [data, setData] = useState<InitialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw new Error(`Session error: ${sessionError.message}`);
        }

        if (!session) {
          console.log("No session found");
          setLoading(false);
          return;
        }

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser(session.access_token);

        if (userError) {
          throw new Error(`User error: ${userError.message}`);
        }

        if (!user) {
          throw new Error("No user found in session");
        }

        const headers = {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        };

        const [
          clientsResponse,
          pendingReferralsResponse,
          archivedReferralsResponse,
          rewardsResponse,
        ] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/clients`, {
            headers,
          }).then((res) => {
            if (!res.ok)
              throw new Error(`Failed to fetch clients: ${res.statusText}`);
            return res.json();
          }),
          fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/api/referrals/pending/`,
            { headers }
          ).then((res) => {
            if (!res.ok)
              throw new Error(
                `Failed to fetch pending referrals: ${res.statusText}`
              );
            return res.json();
          }),
          fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/api/referrals/archived/`,
            { headers }
          ).then((res) => {
            if (!res.ok)
              throw new Error(
                `Failed to fetch archived referrals: ${res.statusText}`
              );
            return res.json();
          }),
          fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/rewards/`, {
            headers,
          }).then((res) => {
            if (!res.ok) {
              if (res.status === 404) {
                return { status: "success", data: [] };
              }
              throw new Error(`Failed to fetch rewards: ${res.statusText}`);
            }
            return res.json();
          }),
        ]);

        const clients = (clientsResponse.data || []).map(
          (clientData: ClientResponse) =>
            new Client(
              clientData.id,
              clientData.contact,
              clientData.referral_link
            )
        );

        const clientsMap = new Map(
          clients.map((client: Client) => [client.clientId, client])
        );

        const pendingReferrals = (pendingReferralsResponse.data || []).map(
          (referralData: ReferralResponse) => {
            const referrer = clientsMap.get(referralData.referrer) as Client;
            const referred = clientsMap.get(referralData.referred) as Client;

            if (!referrer || !referred) {
              throw new Error(
                `Client not found for referral ${referralData.id}`
              );
            }

            return new PendingReferral(
              referralData.id,
              referrer,
              referred,
              new Date(referralData.date),
              referralData.status as "pending appointment" | "pending approval"
            );
          }
        );

        const archivedReferrals = (archivedReferralsResponse.data || []).map(
          (referralData: ReferralResponse) => {
            const referrer = clientsMap.get(referralData.referrer) as Client;
            const referred = clientsMap.get(referralData.referred) as Client;

            if (!referrer || !referred) {
              throw new Error(
                `Client not found for referral ${referralData.id}`
              );
            }

            return new ArchivedReferral(
              referralData.id,
              referrer,
              referred,
              new Date(referralData.date),
              referralData.status as "cancelled" | "successful"
            );
          }
        );

        const rewards = (rewardsResponse.data || [])
          .map((rewardData: RewardResponse) => {
            const recipient = clientsMap.get(rewardData.recipient) as Client;
            const associatedReferral = archivedReferrals.find(
              (r: ArchivedReferral) => r.referralId === rewardData.referral
            );

            if (!recipient || !associatedReferral) {
              throw new Error(
                `Recipient or referral not found for reward ${rewardData.id}`
              );
            }

            if (associatedReferral.status === "successful") {
              return new Reward(
                rewardData.id,
                recipient,
                new Date(rewardData.date),
                rewardData.rewardtype as "gift card" | "custom",
                rewardData.rewardvalue,
                associatedReferral,
                rewardData.status as "issued" | "pending"
              );
            }
            return null;
          })
          .filter(Boolean); // Remove null values

        setData({
          clients,
          pendingReferrals,
          archivedReferrals,
          rewards,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while loading data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
