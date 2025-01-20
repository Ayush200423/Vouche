import { Client } from "./ClientType";
import { ArchivedReferral, PendingReferral } from "./ReferralType";
import { Reward } from "./RewardType";

// Create Clients
const client1 = new Client("michael.johnson@example.com", "link1");
const client2 = new Client("sarah.miller@example.com", "link2");
const client3 = new Client("david.smith@example.com", "link3");
const client4 = new Client("emma.brown@example.com", "link4");

// Create Referrals
const pendingReferral1 = new PendingReferral(
  client1,
  client2,
  new Date("2025-01-01"),
  "pending appointment"
);
const pendingReferral2 = new PendingReferral(
  client2,
  client3,
  new Date("2025-01-05"),
  "pending approval"
);
const archivedReferral1 = new ArchivedReferral(
  client3,
  client4,
  new Date("2025-01-10"),
  "successful"
);
const archivedReferral2 = new ArchivedReferral(
  client4,
  client1,
  new Date("2025-01-12"),
  "cancelled"
);

// Create Rewards
const reward1 = new Reward(
  client3,
  new Date("2025-01-11"),
  "gift card",
  "$100",
  archivedReferral1
);
const reward2 = new Reward(
  client4,
  new Date("2025-01-11"),
  "gift card",
  "$50",
  archivedReferral1
);
const reward3 = new Reward(
  client1,
  new Date("2025-01-13"),
  "manual",
  "Thank you note",
  archivedReferral2
);

// Add Referrals to Clients
client1.addReferral(pendingReferral1); // client1 refers client2
client2.addReferral(pendingReferral2); // client2 refers client3
client3.addReferral(archivedReferral1); // client3 refers client4
client4.addReferral(archivedReferral2); // client4 refers client1

// Add Rewards to Clients
client3.addAvailableReward(reward1); // client3 gets a reward for a successful referral
client4.addAvailableReward(reward2); // client4 gets a reward for a successful referral
client1.addAvailableReward(reward3); // client1 gets a thank you note reward for a cancelled referral

export const clients = [client1, client2, client3, client4];
