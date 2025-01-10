import React, { ReactNode, useEffect, useState } from "react";
import supabase from "./SupabaseAuth";
import { Navigate } from "react-router-dom";
import Loading from "@/components/utils/Loading";

interface AuthenticationWrapperProps {
  children: ReactNode;
}

const AuthenticationWrapper: React.FC<AuthenticationWrapperProps> = ({
  children,
}) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // !!session means !!null = false, !!object = true
      setAuthenticated(!!session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    if (!authenticated) {
      return <>{children}</>;
    }
    return <Navigate to="/dashboard" />;
  }
};

export default AuthenticationWrapper;
