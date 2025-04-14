import logo from "../../../../assets/smallLogo.png";
import { Button } from "../../../ui/button";
import { NavigationBar } from "./NavigationBar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full border-b border-gray-200">
      <div className="w-full h-16 sm:h-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 flex items-center justify-between">
        <div className="flex h-full items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10">
          <div className="max-w-[120px] sm:max-w-[150px]">
            <Link to="/">
              <img src={logo} alt="Vouche" className="w-full h-auto" />
            </Link>
          </div>

          <div className="hidden sm:block">
            <NavigationBar />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link to="/login">
            <Button variant={"link"} size={"lg"} className="sm:size-lg">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button size={"lg"} className="sm:size-lg">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
