import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class NavBar extends React.Component {
  state = {
    isOpen: false,
    user: {}
  }

  componentWillReceiveProps = (newProps) => {
    this.setState({ user: newProps.user })
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">NC News</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/articles">Articles</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Topics
                </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem>
                    <NavLink href="/topics/football">Football</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/topics/coding">Coding</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/topics/cooking">Cooking</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/users">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/users/northcoder"><img onError={addDefaultSrc} src={user.avatar_url} alt="Avatar" height="20" width="20" style={{borderRadius:"50%"}}/>  {user.username}</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const addDefaultSrc = (e) => {
  e.target.src = '/default_profile.png';
}

export default NavBar;