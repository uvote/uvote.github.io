import { FC } from "react";
import { Navbar, NavbarBrand, NavbarEnd, NavbarItem, NavbarMenu } from "trunx";
import { asset } from "../assets";
import { ConnectMetaMask } from "./ConnectMetaMask";

export const Nav: FC = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <NavbarItem>
          <img src={asset.logoType} alt="" />
        </NavbarItem>
      </NavbarBrand>

      <NavbarMenu isActive>
        <NavbarEnd>
          <NavbarItem>
            <ConnectMetaMask />
          </NavbarItem>
        </NavbarEnd>
      </NavbarMenu>
    </Navbar>
  );
};
