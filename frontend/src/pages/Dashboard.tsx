import React, { useEffect, useState } from "react";
import supabase from "@/helpers/SupabaseAuth";

const Dashboard = () => {
  const [name, setName] = useState<string>(""); // Default name to an empty string
  const [loading, setLoading] = useState<boolean>(true); // For loading state

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
      }

      if (data) {
        setName(data.user?.user_metadata?.name || "Guest"); // Default to "Guest" if name is not available
      }

      setLoading(false); // Set loading to false once data is fetched
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <div>
      Welcome, {name}!
      <button
        onClick={async () => {
          await supabase.auth.signOut();
        }}
      >
        Log out
      </button>
    </div>
  ); // Display the name
};

export default Dashboard;
