import { Referral } from "./ReferralType";
import { Reward } from "./RewardType";

// ==================== Clients ====================
export class Client {
  private _clientId: string;
  private _contact: string;
  private _link: string;
  private _availableRewards: Reward[];
  private _previousReferrals: Referral[];

  constructor(contact: string, link: string) {
    this._clientId = generateReferralId();
    this._contact = contact;
    this._link = link;
    this._availableRewards = [];
    this._previousReferrals = [];
  }

  get clientId(): string {
    return this._clientId;
  }

  get contact(): string {
    return this._contact;
  }

  get link(): string {
    return this._link;
  }

  get available_rewards(): Reward[] {
    return this._availableRewards;
  }

  get previous_referrals(): Referral[] {
    return this._previousReferrals;
  }

  addAvailableReward(reward: Reward): void {
    this._availableRewards.push(reward);
  }

  addReferral(referral: Referral): void {
    this._previousReferrals.push(referral);
  }
}

const generateReferralId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};
