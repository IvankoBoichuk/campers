import { NavLink } from "react-router-dom";
const Navigation = ({ ...props }) => (
  <nav {...props}>
    <ul className="flex justify-center gap-8 font-medium">
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-theme-btn-hover" : null
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-theme-btn-hover" : null
          }
          to="/catalog"
        >
          Catalog
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
