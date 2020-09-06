import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import routes from "../routes/routes";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavLink className="navbar-brand" to={routes.Dashboard}>
        Url app
      </NavLink>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
        <NavItem>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to={routes.Table}
            >
              Table
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to={routes.Chart}
            >
              Chart
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to={routes.Logout}
            >
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
