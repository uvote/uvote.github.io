import { FC } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarItem } from "trunx";

import { asset } from "../assets";
import { AccountPreview } from "../components/AccountPreview";
import { pathname } from "../routing/pathnames";
import { classNames } from "../styles/classNames";

type NavProps = {
  showAccount?: boolean;
};

export const Nav: FC<NavProps> = ({ showAccount = false }) => {
  return (
    <Navbar className={classNames("is-fixed-top")} color="light">
      <NavbarBrand>
        <NavbarItem>
          <Link to={pathname.homepage()}>
            <img src={asset.logoType} alt="" />
          </Link>
        </NavbarItem>

        {showAccount ? (
          <NavbarItem>
            <AccountPreview />
          </NavbarItem>
        ) : null}
      </NavbarBrand>
    </Navbar>
  );
};
