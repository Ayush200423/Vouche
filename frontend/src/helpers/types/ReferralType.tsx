import { Client } from "./ClientType";
import { Reward } from "./RewardType";

// ==================== Referrals ====================
export abstract class Referral {
  private _referralId: string;
  private _referrer: Client;
  private _referred: Client;
  private _date: Date;
  private _rewards: Reward[];

  constructor(
    referralId: string,
    referrer: Client,
    referred: Client,
    date: Date
  ) {
    this._referralId = referralId;
    this._referrer = referrer;
    this._referred = referred;
    this._date = date;
    this._rewards = [];
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
    return this._rewards;
  }

  abstract get isPendingReferral(): boolean;

  abstract get status(): PendingReferralStatus | ArchivedReferralStatus;

  addReward(reward: Reward): void {
    this._rewards.push(reward);
  }
}

type PendingReferralStatus = "pending appointment" | "pending approval";
type ArchivedReferralStatus = "cancelled" | "successful";

export class PendingReferral extends Referral {
  private _status: PendingReferralStatus;

  constructor(
    referralId: string,
    referrer: Client,
    referred: Client,
    date: Date,
    status: PendingReferralStatus
  ) {
    super(referralId, referrer, referred, date);
    this._status = status;
  }

  get status(): PendingReferralStatus {
    return this._status;
  }

  get isPendingReferral(): boolean {
    return true;
  }
}

export class ArchivedReferral extends Referral {
  private _status: ArchivedReferralStatus;
  private _referrerReward: Reward | null;
  private _referredReward: Reward | null;

  constructor(
    referralId: string,
    referrer: Client,
    referred: Client,
    date: Date,
    status: ArchivedReferralStatus
  ) {
    super(referralId, referrer, referred, date);
    this._status = status;
    this._referrerReward = null;
    this._referredReward = null;

    if (status === "successful") {
      referrer.addReferral(this);
      // TODO: can indicate (with flag) that referred client was "referred"
    }
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

  get isPendingReferral(): boolean {
    return false;
  }

  addReferrerReward(reward: Reward): void {
    if (this._status === "successful") {
      this._referrerReward = reward;
      this.addReward(reward); // Add to the general rewards list
    } else {
      throw new Error(
        `This referral ${this.referralId} is not status "successful"`
      );
    }
  }

  addReferredReward(reward: Reward): void {
    if (this._status === "successful") {
      this._referredReward = reward;
      this.addReward(reward); // Add to the general rewards list
    } else {
      throw new Error(
        `This referral ${this.referralId} is not status "successful"`
      );
    }
  }
}
