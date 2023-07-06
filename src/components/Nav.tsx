import { FC } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarItem } from "trunx";

import { asset } from "../assets";
import { routePath } from "../routing/routes";
import { classNames } from "../styles/classNames";

type NavProps = {
  showAccountInfo?: boolean;
};

export const Nav: FC<NavProps> = ({ showAccountInfo = false }) => {
  return (
    <Navbar className={classNames("is-fixed-top")} color="light">
      <NavbarBrand>
        <NavbarItem>
          <Link to={routePath.homepage()}>
            <img src={asset.logoType} alt="" />
          </Link>
        </NavbarItem>

        {showAccountInfo ? <NavbarItem>account</NavbarItem> : null}
      </NavbarBrand>
    </Navbar>
  );
};
