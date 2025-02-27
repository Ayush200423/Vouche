import React from "react";
import logo from "../../../../assets/smallLogo.png";
import { Button } from "../../../ui/button";
import { NavigationBar } from "./NavigationBar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full border-b border-gray-200">
      <div className="w-full h-20 px-[100px] flex items-center justify-between">
        <div className="flex h-full items-center space-x-10">
          <div className="max-w-[150px]">
            <a href="/">
              <img src={logo} alt="Vouche" />
            </a>
          </div>

          <div>
            <NavigationBar />
          </div>
        </div>

        <div className="space-x-3">
          <Link to="/login">
            <Button variant={"link"} size={"lg"}>
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button size={"lg"}>Sign up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
