import { Button } from "../../ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="h-[680px] px-[100px] flex items-end">
      <div className="h-[550px] py-[50px] flex flex-col justify-evenly">
        <div className="font-semibold text-[50px] lg:text-[65px] flex flex-col">
          <span className="block leading-tight">Referrals made</span>
          <span className="block leading-tight bg-gradient-to-r from-blue-700 via-cyan-600 to-green-700 bg-clip-text text-transparent">
            easy, automated & scalabe
          </span>
        </div>

        <div className="font-medium lg:text-[18px] text-vouche -mt-8 ">
          Vouche helps incentivize word of mouth growth for your recurring
          service-based business.
        </div>

        <div>
          <Link to="/register">
            <Button size={"lg"}>Try for free</Button>
          </Link>
        </div>

        <div className="-mt-7">
          <a href="#here" className="text-[#0000EE]">
            See a list of businesses
          </a>{" "}
          we have developed specific referral programs for.
        </div>
      </div>
    </div>
  );
};

export default Landing;
