import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBurger,
  NavbarBurgerOnClick,
  NavbarBrand,
  NavbarItem,
  NavbarItemAnchor,
  NavbarMenu,
  NavbarEnd,
} from "trunx";
import {asset} from '../assets'

export function Navigation() {
  const [isActive, setIsActive] = useState(false);

  const onClickBurger = useCallback<NavbarBurgerOnClick>((event) => {
    event.stopPropagation();
    setIsActive((isActive) => !isActive);
  }, []);

  // Close menu on outside click.
  useEffect(() => {
    const closeMenu = () => {
      setIsActive(false);
    };
    window.addEventListener("click", closeMenu);
    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <Navbar color="light">
      <NavbarBrand>
        <NavbarItem>
          <img src={asset.logoType} alt="" />
        </NavbarItem>

        <NavbarBurger isActive={isActive} onClick={onClickBurger} />
      </NavbarBrand>

      <NavbarMenu isActive={isActive}>
        <NavbarEnd>
          <NavbarItemAnchor href="https://github.com/uvote">
            GitHub
          </NavbarItemAnchor>
        </NavbarEnd>
      </NavbarMenu>
    </Navbar>
  );
}
