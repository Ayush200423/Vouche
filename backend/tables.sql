CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    referral_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id UUID REFERENCES clients(id),
    referred_id UUID REFERENCES clients(id),
    status TEXT NOT NULL,  -- 'pending', 'archived', 'successful', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID REFERENCES clients(id),
    referral_id UUID REFERENCES referrals(id),
    reward_type TEXT NOT NULL,  -- 'gift card', 'manual'
    reward_value TEXT NOT NULL,
    status TEXT NOT NULL,  -- 'issued', 'pending', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);