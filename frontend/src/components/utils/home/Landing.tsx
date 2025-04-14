import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="h-[680px] px-4 sm:px-8 md:px-12 lg:px-[100px] flex items-end">
      <div className="h-[550px] py-[50px] flex flex-col justify-evenly w-full">
        <div className="font-semibold text-[40px] sm:text-[50px] lg:text-[65px] flex flex-col">
          <span className="block leading-tight">Referrals made</span>
          <span className="block leading-tight bg-gradient-to-r from-blue-700 via-cyan-600 to-green-700 bg-clip-text text-transparent">
            easy, automated & scalable
          </span>
        </div>

        <div className="font-medium text-base sm:text-lg lg:text-[18px] text-vouche -mt-8">
          Vouche helps incentivize word of mouth growth for your recurring
          service-based business.
        </div>

        <div>
          <Link to="/register">
            <Button size={"lg"} className="flex items-center gap-2">
              Try for free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="-mt-7">
          <a href="#here" className="text-[#0000EE]">
            Explore businesses
          </a>{" "}
          our automated referral programs are designed to support.
        </div>
      </div>
    </div>
  );
};

export default Landing;
