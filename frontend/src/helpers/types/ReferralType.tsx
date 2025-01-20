import { Client } from "./ClientType";
import { Reward } from "./RewardType";

const generateReferralId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// ==================== Referrals ====================
// ==================== Referrals ====================
export abstract class Referral {
  private _referralId: string;
  private _referrer: Client;
  private _referred: Client;
  private _date: Date;
  private _rewards: Reward[]; // Add rewards property

  constructor(referrer: Client, referred: Client, date: Date) {
    this._referralId = generateReferralId();
    this._referrer = referrer;
    this._referred = referred;
    this._date = date;
    this._rewards = []; // Initialize rewards array
  }

  get referralId(): string {
    return this._referralId;
  }

  get referrer(): Client {
    return this._referrer;
  }

  get referred(): Client {
    return this._referred;
  }

  get date(): Date {
    return this._date;
  }

  get rewards(): Reward[] {
    // Getter for rewards
    return this._rewards;
  }

  // Method to add rewards to the referral
  addReward(reward: Reward): void {
    this._rewards.push(reward);
  }
}

type PendingReferralStatus = "pending appointment" | "pending approval";
type ArchivedReferralStatus = "cancelled" | "successful";

export class PendingReferral extends Referral {
  private _status: PendingReferralStatus;

  constructor(
    referrer: Client,
    referred: Client,
    date: Date,
    status: PendingReferralStatus
  ) {
    super(referrer, referred, date);
    this._status = status;
  }

  get status(): PendingReferralStatus {
    return this._status;
  }
}

export class ArchivedReferral extends Referral {
  private _status: ArchivedReferralStatus;
  private _referrerReward: Reward | null;
  private _referredReward: Reward | null;

  constructor(
    referrer: Client,
    referred: Client,
    date: Date,
    status: ArchivedReferralStatus
  ) {
    super(referrer, referred, date);
    this._status = status;
    this._referrerReward = null;
    this._referredReward = null;
  }

  get status(): ArchivedReferralStatus {
    return this._status;
  }

  get referrerReward(): Reward | null {
    return this._referrerReward;
  }

  get referredReward(): Reward | null {
    return this._referredReward;
  }

  addReferrerReward(reward: Reward): void {
    if (this._status === "successful") {
      this._referrerReward = reward;
      this.addReward(reward); // Add to the general rewards list
    } else {
      throw new Error(
        `This referral ${this._status} is not status "successful"`
      );
    }
  }

  addReferredReward(reward: Reward): void {
    if (this._status === "successful") {
      this._referredReward = reward;
      this.addReward(reward); // Add to the general rewards list
    } else {
      throw new Error(
        `This referral ${this._status} is not status "successful"`
      );
    }
  }
}
