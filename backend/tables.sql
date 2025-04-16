CREATE TABLE campaigns (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    referrer_reward_type TEXT CHECK (referrer_reward_type IN ('gift card', 'custom', 'message')),
    referrer_reward_value TEXT NOT NULL,
    referred_reward_type TEXT CHECK (referred_reward_type IN ('gift card', 'custom', 'message')),
    referred_reward_value TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id)
);

CREATE TABLE clients (
    id TEXT PRIMARY KEY,
    contact TEXT NOT NULL UNIQUE,
    referral_link TEXT NOT NULL UNIQUE,
    campaign TEXT NOT NULL REFERENCES campaigns(id)
);

CREATE TABLE referrals (
    id TEXT PRIMARY KEY,
    referrer TEXT NOT NULL REFERENCES clients(id),
    referred TEXT NOT NULL REFERENCES clients(id),
    date TIMESTAMP NOT NULL,
    status TEXT CHECK (status IN ('pending approval', 'pending appointment', 'successful', 'cancelled')),
    campaign TEXT NOT NULL REFERENCES campaigns(id),
    
    CONSTRAINT no_self_referral CHECK (referrer != referred)
);

CREATE TABLE rewards (
    id TEXT PRIMARY KEY,
    recipient TEXT REFERENCES clients(id),
    date TIMESTAMP,
    rewardType TEXT CHECK (rewardType IN ('gift card', 'custom')),
    rewardValue TEXT,
    referral TEXT REFERENCES referrals(id),
    status TEXT CHECK (status IN ('issued', 'pending')),

    -- For data consistency:
    CONSTRAINT status_date_consistency CHECK (
        (status = 'issued' AND date IS NOT NULL) OR
        (status = 'pending' AND date IS NULL)
    )
);