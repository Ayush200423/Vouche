import React, { ReactNode, useEffect, useState } from "react";
import supabase from "./SupabaseAuth";
import { Navigate } from "react-router-dom";
import Loading from "@/components/utils/Loading";

interface ProtectedWrapperProps {
  children: ReactNode;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
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
    if (authenticated) {
      return <>{children}</>;
    }
    return <Navigate to="/login" />;
  }
};

export default ProtectedWrapper;
