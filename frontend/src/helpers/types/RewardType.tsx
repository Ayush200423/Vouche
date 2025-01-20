import { Client } from "./ClientType";
import { Referral } from "./ReferralType";

// ==================== Rewards ====================
type RewardType = "gift card" | "manual";
export class Reward {
  private _rewardId: string;
  private _recipient: Client;
  private _dateRewarded: Date;
  private _rewardType: RewardType;
  private _rewardValue: string;
  private _associatedReferral: Referral;

  constructor(
    recipient: Client,
    date: Date,
    rewardType: RewardType,
    rewardValue: string,
    associatedReferral: Referral
  ) {
    this._rewardId = generateReferralId();
    this._recipient = recipient;
    this._dateRewarded = date;
    this._rewardType = rewardType;
    this._rewardValue = rewardValue;
    this._associatedReferral = associatedReferral;
  }

  get rewardId(): string {
    return this._rewardId;
  }

  get recipient(): Client {
    return this._recipient;
  }

  get dateRewarded(): Date {
    return this._dateRewarded;
  }

  get rewardType(): RewardType {
    return this._rewardType;
  }

  get rewardValue(): string {
    return this._rewardValue;
  }

  get associatedReferral(): Referral {
    return this._associatedReferral;
  }
}

const generateReferralId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};
