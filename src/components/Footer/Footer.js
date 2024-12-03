/*!
=========================================================
* Android Static Analysis Framework Dashboard
=========================================================
* Product Page: https://www.example.com/product-page
* Copyright 2023 Spill Scope (https://www.example.com)
* Licensed under MIT (https://github.com/spillscope/android-static-analysis-framework/LICENSE.md)
* Coded by Spill Scope
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://www.example.com/?ref=footer">
              Android Static Analysis Framework
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://www.example.com/about?ref=footer">
              About Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://www.example.com/blog?ref=footer">
              Blog
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} developed with{" "}
          <i className="tim-icons icon-heart-2" /> by{" "}
          <a
            href="https://www.example.com/?ref=footer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spill Scope
          </a>{" "}
          for a more secure Android ecosystem.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
