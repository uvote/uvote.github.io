import { FC } from "react";
import { Navbar, NavbarBrand, NavbarItem } from "trunx";
import { asset } from "../assets";
import { classNames } from "../styles/classNames";
import { ConnectWallet } from "./ConnectWallet";

export const Nav: FC = () => {
  return (
    <Navbar className={classNames("is-fixed-top")} color="light">
      <NavbarBrand>
        <NavbarItem>
          <img src={asset.logoType} alt="" />
        </NavbarItem>

        <NavbarItem>
          <ConnectWallet />
        </NavbarItem>
      </NavbarBrand>
    </Navbar>
  );
};
