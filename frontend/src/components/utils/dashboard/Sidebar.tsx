import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, Share2, Gift, Megaphone } from "lucide-react";

const Sidebar: React.FC = () => {
  const location = window.location;

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-navy-900 text-white overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 py-4">
            <h1 className="text-2xl font-bold text-white">Vouche</h1>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              <Link
                to="/dashboard"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === "/dashboard"
                    ? "bg-navy-800 text-white"
                    : "text-gray-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="/dashboard/clients"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === "/dashboard/clients"
                    ? "bg-navy-800 text-white"
                    : "text-gray-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Clients
              </Link>
              <Link
                to="/dashboard/referrals"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === "/dashboard/referrals"
                    ? "bg-navy-800 text-white"
                    : "text-gray-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Share2 className="mr-3 h-5 w-5" />
                Referrals
              </Link>
              <Link
                to="/dashboard/rewards"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === "/dashboard/rewards"
                    ? "bg-navy-800 text-white"
                    : "text-gray-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Gift className="mr-3 h-5 w-5" />
                Rewards
              </Link>
              <Link
                to="/dashboard/campaigns"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === "/dashboard/campaigns"
                    ? "bg-navy-800 text-white"
                    : "text-gray-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Megaphone className="mr-3 h-5 w-5" />
                Campaigns
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-navy-800 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">User Name</p>
                  <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                    View profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
