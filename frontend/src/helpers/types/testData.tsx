import { Client } from "./ClientType";
import { PendingReferral, ArchivedReferral } from "./ReferralType";
import { Reward } from "./RewardType";

// ==================== Clients ====================
const client1 = new Client(
  "213908",
  "lucas.martin@example.com",
  "http://vouche.com/referral/1"
);
const client2 = new Client(
  "1093284",
  "olivia.clark@example.com",
  "http://vouche.com/referral/2"
);
const client3 = new Client(
  "9048231",
  "ava.rodriguez@example.com",
  "http://vouche.com/referral/3"
);
const client4 = new Client(
  "2139084",
  "ethan.morris@example.com",
  "http://vouche.com/referral/4"
);
const client5 = new Client(
  "1923084",
  "sophia.james@example.com",
  "http://vouche.com/referral/5"
);

// ==================== Archived Referrals ====================
const archivedReferral1 = new ArchivedReferral(
  "0139284",
  client1, // Referrer
  client2, // Referred
  new Date("2024-11-10"), // Date
  "successful" // Status
);

const archivedReferral2 = new ArchivedReferral(
  "1290843",
  client3, // Referrer
  client4, // Referred
  new Date("2024-12-01"), // Date
  "successful" // Status
);

const archivedReferral3 = new ArchivedReferral(
  "1239843",
  client2, // Referrer
  client5, // Referred
  new Date("2025-01-10"), // Date
  "successful" // Status
);

// Add rewards to archived referrals
const reward1 = new Reward(
  "1239084",
  client1, // Recipient
  new Date("2024-11-15"), // Date Rewarded
  "gift card", // Reward Type
  "$30", // Reward Value
  archivedReferral1 // Associated Referral
);

const reward2 = new Reward(
  "192084",
  client2, // Recipient
  new Date("2024-11-15"), // Date Rewarded
  "manual", // Reward Type
  "Free Massage Session", // Reward Value
  archivedReferral1 // Associated Referral
);

const reward3 = new Reward(
  "12984241",
  client3, // Recipient
  new Date("2024-12-05"), // Date Rewarded
  "gift card", // Reward Type
  "$50", // Reward Value
  archivedReferral2 // Associated Referral
);

const reward4 = new Reward(
  "408923",
  client4, // Recipient
  new Date("2024-12-05"), // Date Rewarded
  "manual", // Reward Type
  "Gym Membership", // Reward Value
  archivedReferral2 // Associated Referral
);

const reward5 = new Reward(
  "190483",
  client2, // Recipient
  new Date("2025-01-15"), // Date Rewarded
  "gift card", // Reward Type
  "$75", // Reward Value
  archivedReferral3 // Associated Referral
);

const reward6 = new Reward(
  "3901248",
  client5, // Recipient
  new Date("2025-01-15"), // Date Rewarded
  "manual", // Reward Type
  "Weekend Getaway", // Reward Value
  archivedReferral3 // Associated Referral
);

// ==================== Pending Referrals ====================
const pendingReferral1 = new PendingReferral(
  "940128",
  client4, // Referrer
  client1, // Referred
  new Date("2025-01-20"), // Date
  "pending appointment" // Status
);

const pendingReferral2 = new PendingReferral(
  "3210948",
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
