import { FC } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarItem } from "trunx";

import { asset } from "../assets";
import { ConnectWalletContextProvider } from "../contexts/ConnectWallet";
import { routePath } from "../routing";
import { classNames } from "../styles/classNames";
import { ConnectWallet } from "./ConnectWallet";

type NavProps = {
  withConnectWallet?: boolean;
};

export const Nav: FC<NavProps> = ({ withConnectWallet = false }) => {
  return (
    <Navbar className={classNames("is-fixed-top")} color="light">
      <NavbarBrand>
        <NavbarItem>
          <Link to={routePath.homepage()}>
            <img src={asset.logoType} alt="" />
          </Link>
        </NavbarItem>

        {withConnectWallet ? (
          <NavbarItem>
            <ConnectWalletContextProvider>
              <ConnectWallet />
            </ConnectWalletContextProvider>
          </NavbarItem>
        ) : null}
      </NavbarBrand>
    </Navbar>
  );
};
