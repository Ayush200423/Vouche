import { Client } from "./ClientType";
import { ArchivedReferral, Referral } from "./ReferralType";

// ==================== Rewards ====================
type RewardType = "gift card" | "custom";
type RewardStatus = "issued" | "pending";
export class Reward {
  private _rewardId: string;
  private _recipient: Client;
  private _dateRewarded: Date;
  private _rewardType: RewardType;
  private _rewardValue: string;
  private _associatedReferral: ArchivedReferral;
  private _rewardStatus: RewardStatus;

  constructor(
    rewardId: string,
    recipient: Client,
    date: Date,
    rewardType: RewardType,
    rewardValue: string,
    associatedReferral: ArchivedReferral,
    rewardStatus: RewardStatus
  ) {
    this._rewardId = rewardId;
    this._recipient = recipient;
    this._dateRewarded = date;
    this._rewardType = rewardType;
    this._rewardValue = rewardValue;
    this._associatedReferral = associatedReferral;
    this._rewardStatus = rewardStatus;

    if (
      recipient.clientId !== associatedReferral.referrer.clientId &&
      recipient.clientId !== associatedReferral.referred.clientId
    ) {
      throw new Error(
        `Error creating reward: Recipient ${recipient.clientId} is neither the referrer nor the referred client in referral ${associatedReferral.referralId}.`
      );
    }

    if (associatedReferral.status === "successful") {
      if (recipient.clientId === associatedReferral.referred.clientId) {
        associatedReferral.addReferredReward(this);
      } else {
        associatedReferral.addReferrerReward(this);
      }
    } else {
      throw new Error(
        `Error creating reward: Reward ${this._rewardId} is not associated with a 'successful' referral.`
      );
    }

    if (rewardStatus === "pending") {
      recipient.addAvailableReward(this)
    }
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

  get rewardStatus(): RewardStatus {
    return this._rewardStatus;
  }
}
