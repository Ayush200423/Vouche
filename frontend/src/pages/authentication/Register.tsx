//import AuthLayout from "@/components/utils/authentication/AuthLayout";
import React from "react";

import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "@/helpers/SupabaseAuth";
import { Session } from "@supabase/supabase-js";

const Register = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["google"]}
      queryParams={{
        access_type: "offline",
        prompt: "consent",
        hd: "domain.com",
      }}
      providerScopes={{
        google: "https://www.googleapis.com/auth/calendar.readonly",
      }}
    />
  );

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return <div>Logged in!</div>;
  }
};

export default Register;
