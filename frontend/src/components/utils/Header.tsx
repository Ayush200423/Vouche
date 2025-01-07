import React from "react";
import logo from "../../assets/smallLogo.png";
import { Button } from "../ui/button";
import { NavigationBar } from "./NavigationBar";

const Header = () => {
  return (
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
        <Button variant={"link"} size={"lg"}>
          Log in
        </Button>
        <Button size={"lg"}>Sign up</Button>
      </div>
    </div>
  );
};

export default Header;
