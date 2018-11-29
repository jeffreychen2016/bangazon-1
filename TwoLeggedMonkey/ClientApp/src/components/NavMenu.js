import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>TwoLeggedMonkey</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/computer'}>
              <NavItem>
                <Glyphicon /> Computer
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/customer'}>
              <NavItem>
                <Glyphicon /> Customer
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/department'}>
              <NavItem>
                <Glyphicon /> Department
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/employee'}>
              <NavItem>
                <Glyphicon /> Employee
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/order'}>
              <NavItem>
                <Glyphicon /> Order
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/paymenttype'}>
              <NavItem>
                 Payment Type
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/product'}>
              <NavItem>
                <Glyphicon /> Product
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/trainingprogram'}>
              <NavItem>
                <Glyphicon /> Training Program
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
