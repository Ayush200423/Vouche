import { Client } from "./ClientType";
import { PendingReferral, ArchivedReferral } from "./ReferralType";
import { Reward } from "./RewardType";

// ==================== Clients ====================
const client1 = new Client(
  "john.doe@example.com",
  "http://vouche.com/referral/1"
);
const client2 = new Client(
  "jane.smith@example.com",
  "http://vouche.com/referral/2"
);
const client3 = new Client(
  "will.johnson@example.com",
  "http://vouche.com/referral/3"
);
const client4 = new Client(
  "emily.davis@example.com",
  "http://vouche.com/referral/4"
);
const client5 = new Client(
  "michael.brown@example.com",
  "http://vouche.com/referral/5"
);

// ==================== Archived Referrals ====================
const archivedReferral1 = new ArchivedReferral(
  client1, // Referrer
  client2, // Referred
  new Date("2024-11-10"), // Date
  "successful" // Status
);

const archivedReferral2 = new ArchivedReferral(
  client3, // Referrer
  client4, // Referred
  new Date("2024-12-01"), // Date
  "successful" // Status
);

const archivedReferral3 = new ArchivedReferral(
  client2, // Referrer
  client5, // Referred
  new Date("2025-01-10"), // Date
  "successful" // Status
);

// Add rewards to archived referrals
const reward1 = new Reward(
  client1, // Recipient
  new Date("2024-11-15"), // Date Rewarded
  "gift card", // Reward Type
  "$30", // Reward Value
  archivedReferral1 // Associated Referral
);

const reward2 = new Reward(
  client2, // Recipient
  new Date("2024-11-15"), // Date Rewarded
  "manual", // Reward Type
  "Free Spa Session", // Reward Value
  archivedReferral1 // Associated Referral
);

archivedReferral1.addReferrerReward(reward1);
archivedReferral1.addReferredReward(reward2);

const reward3 = new Reward(
  client3, // Recipient
  new Date("2024-12-05"), // Date Rewarded
  "gift card", // Reward Type
  "$50", // Reward Value
  archivedReferral2 // Associated Referral
);

const reward4 = new Reward(
  client4, // Recipient
  new Date("2024-12-05"), // Date Rewarded
  "manual", // Reward Type
  "Gym Membership", // Reward Value
  archivedReferral2 // Associated Referral
);

archivedReferral2.addReferrerReward(reward3);
archivedReferral2.addReferredReward(reward4);

const reward5 = new Reward(
  client2, // Recipient
  new Date("2025-01-15"), // Date Rewarded
  "gift card", // Reward Type
  "$75", // Reward Value
  archivedReferral3 // Associated Referral
);

const reward6 = new Reward(
  client5, // Recipient
  new Date("2025-01-15"), // Date Rewarded
  "manual", // Reward Type
  "Luxury Dinner for Two", // Reward Value
  archivedReferral3 // Associated Referral
);

archivedReferral3.addReferrerReward(reward5);
archivedReferral3.addReferredReward(reward6);

// Add archived referrals to clients
client1.addReferral(archivedReferral1);
client3.addReferral(archivedReferral2);
client2.addReferral(archivedReferral3);

// ==================== Pending Referrals ====================
const pendingReferral1 = new PendingReferral(
  client4, // Referrer
  client1, // Referred
  new Date("2025-01-20"), // Date
  "pending appointment" // Status
);

const pendingReferral2 = new PendingReferral(
  client5, // Referrer
  client3, // Referred
  new Date("2025-01-25"), // Date
  "pending approval" // Status
);

// Export arrays for test data
export const clients = [client1, client2, client3, client4, client5];
export const pending_referrals = [pendingReferral1, pendingReferral2];
export const archived_referrals = [
  archivedReferral1,
  archivedReferral2,
  archivedReferral3,
];
export const rewards = [reward1, reward2, reward3, reward4, reward5, reward6];
