import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { NavigationWrapper } from './Wrappers';
import theme from '../shared/theme';


const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NavList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

const NavItem = styled.li`
    width: 50px;
    height: 50px;
    position: relative;
    background-size: 50px;
    background-position: center;
    background-repeat: no-repeat;
    margin: 10px 10px 65px;  
    cursor:${({ active }) => active ? 'default' : 'pointer'};
    
    a {
        width: 200%;
        position: absolute;
        bottom: -30px;
        left: -50%;
        font-family: OpenSansBold, sans-serif;
        font-size: 14px;
        text-align: center;
        text-transform: uppercase;
        text-decoration: none;
        color: ${theme.light};
    }
`;

const HomeNavItem = styled(NavItem)`
    background-image: ${({ active }) => active ? 'url("/static/images/home-active.svg")' : 'url("/static/images/home.svg")'};
            
    &:hover {
        background-image: ${({ active }) => active ? 'url("/static/images/home-active.svg")' : 'url("/static/images/home-hover.svg")'};
    }
`;

const LocationsNavItem = styled(NavItem)`
    background-image: ${({ active }) => active ? 'url("/static/images/locations-active.svg")' : 'url("/static/images/locations.svg")'};
            
    &:hover {
        background-image: ${({ active }) => active ? 'url("/static/images/locations-active.svg")' : 'url("/static/images/locations-hover.svg")'};
    }
`;

const FavoritesNavItem = styled(NavItem)`
    background-image: ${({ active }) => active ? 'url("/static/images/star-active.svg")' : 'url("/static/images/star.svg")'};
            
    &:hover {
        background-image: ${({ active }) => active ? 'url("/static/images/star-active.svg")' : 'url("/static/images/star-hover.svg")'};
    }
`;

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: true,
      locations: false,
      favorites: false
    };
  }

  activate(section) {
    switch (section) {
      case 'dashboard':
        this.setState({ dashboard: true, locations: false, favorites: false });
        break;
      case 'locations':
        this.setState({ dashboard: false, locations: true, favorites: false });
        break;
      case 'favorites':
        this.setState({ dashboard: false, locations: false, favorites: true });
        break;
      default:
        this.setState({ dashboard: true, locations: false, favorites: false });
    }
  }

  render() {
    const { dashboard, locations, favorites } = this.state;

    return (
      <NavigationWrapper>
        <Nav>
          <NavList>
            <HomeNavItem onClick={() => this.activate('dashboard')} active={dashboard}>
              <Link href='/'>
                Dashboard
              </Link>
            </HomeNavItem>
            <LocationsNavItem onClick={() => this.activate('locations')} active={locations}>
              <Link href='/'>
                Locations
              </Link>
            </LocationsNavItem>
            <FavoritesNavItem onClick={() => this.activate('favorites')} active={favorites}>
              <Link href='/'>
                Favorites
              </Link>
            </FavoritesNavItem>
          </NavList>
        </Nav>
      </NavigationWrapper>
    );
  }
}

export default Navigation;