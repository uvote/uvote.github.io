import { ConnectButton } from "_/components/ConnectButton";
import { classNames } from "_/styles/classNames";
import { FC } from "react";
import { Navbar, NavbarBrand, NavbarItem } from "trunx";

type NavProps = {
  showAccount?: boolean;
};

export const Nav: FC<NavProps> = ({ showAccount = false }) => {
  return (
    <Navbar className={classNames("is-fixed-top")} color="light">
      <NavbarBrand>
        {showAccount ? (
          <NavbarItem>
            <ConnectButton />
          </NavbarItem>
        ) : null}
      </NavbarBrand>
    </Navbar>
  );
};
