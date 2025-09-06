import Logo from "./Logo";
import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";

const Header = () => (
  <header className="py-6 bg-theme-inputs border-b border-theme-badges">
    <div className="container flex items-center">
      <NavLink to="/" rel="home">
        <Logo />
      </NavLink>
      <Navigation className="flex-1" />
    </div>
  </header>
);

export default Header;
