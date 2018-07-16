import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { NavigationWrapper } from './Styles';
import theme from '../shared/theme';


const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NavList = styled.ul`
    width: 100%;
    list-style-type: none;
    margin: -1px;
    padding: 0;
`;

const NavItem = styled.li`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ active }) => active ? theme.tertiaryBlue : theme.secondaryBlue};
    cursor: ${({ active }) => active ? 'default' : 'pointer'};
    padding: 20px;
    
    &:hover {
        background-color: ${({ active }) => active ? theme.tertiaryBlue : theme.tertiaryBlue.saturate(0.5)};
     }
    
    a {
        font-family: OpenSansBold, sans-serif;
        font-size: 14px;
        text-align: center;
        text-transform: uppercase;
        text-decoration: none;
        color: ${theme.light};
        margin-top: 10px;
    }
`;

const NavIcon = styled.div`
    width: 50px;
    height: 50px;
    background-size: 50px;
    background-position: center;
    background-repeat: no-repeat;   
`;

const LocationNavIcon = styled(NavIcon)`
    background-image: url("/static/images/location.svg");
`;

const SearchNavIcon = styled(NavIcon)`
    background-image: url("/static/images/search.svg");
 `;

const FavoritesNavIcon = styled(NavIcon)`
    background-image: url("/static/images/star.svg");
`;

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: false,
      search: false,
      favorites: false
    };
  }

  activate(section) {
    switch (section) {
      case 'location':
        this.setState({ location: true, search: false, favorites: false });
        break;
      case 'search':
        this.setState({ location: false, search: true, favorites: false });
        break;
      case 'favorites':
        this.setState({ location: false, search: false, favorites: true });
        break;
      default:
        this.setState({ location: true, search: false, favorites: false });
    }
  }

  render() {
    const { location, search, favorites } = this.state;

    return (
      <NavigationWrapper>
        <Nav>
          <NavList>
            <NavItem onClick={() => this.activate('location')} active={location}>
              <LocationNavIcon />
              <Link href='/location'>
                Location
              </Link>
            </NavItem>
            <NavItem onClick={() => this.activate('search')} active={search}>
              <SearchNavIcon />
              <Link href='/search'>
                Search
              </Link>
            </NavItem>
            <NavItem onClick={() => this.activate('favorites')} active={favorites}>
              <FavoritesNavIcon />
              <Link href='/favs'>
                Favs
              </Link>
            </NavItem>
          </NavList>
        </Nav>
      </NavigationWrapper>
    );
  }
}

export default Navigation;