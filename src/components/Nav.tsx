import { FC } from "react";
import { Navbar, NavbarBrand, NavbarItem } from "trunx";
import { asset } from "../assets";

export const Nav: FC = () => {
  return (
    <Navbar color="light">
      <NavbarBrand>
        <NavbarItem>
          <img src={asset.logoType} alt="" />
        </NavbarItem>
      </NavbarBrand>
    </Navbar>
  );
};
