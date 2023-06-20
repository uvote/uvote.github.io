import { FC } from "react";
import { Navbar, NavbarBrand, NavbarEnd, NavbarItem, NavbarMenu } from "trunx";
import { asset } from "../assets";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { ConnectMetaMask } from "./ConnectMetaMask";

export const Nav: FC = () => {
  const scrollPosition = useScrollPosition();

  const isActive = scrollPosition < 10;

  return (
    <Navbar>
      <NavbarBrand>
        <NavbarItem>
          <img src={asset.logoType} alt="" />
        </NavbarItem>
      </NavbarBrand>

      <NavbarMenu isActive={isActive}>
        <NavbarEnd>
          <NavbarItem>
            <ConnectMetaMask />
          </NavbarItem>
        </NavbarEnd>
      </NavbarMenu>
    </Navbar>
  );
};
