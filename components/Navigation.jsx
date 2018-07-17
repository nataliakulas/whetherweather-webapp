import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import styled from 'styled-components';
import { NavigationWrapper } from './Styles';
import theme from '../shared/theme';


const Nav = styled.nav`
    height: calc(100% + 2px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: -1px;
`;

const NavList = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin: 0;
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
    
    span {
        font-family: OpenSansRegular, sans-serif;
        font-size: 14px;
        font-weight: bold;
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

const Navigation = ({ router }) => (
  <NavigationWrapper>
    <Nav>
      <NavList>
        <NavItem onClick={() => Router.push('/location')} active={router.pathname === '/location'}>
          <LocationNavIcon />
          <span>
              Location
          </span>
        </NavItem>
        <NavItem onClick={() => Router.push('/search')} active={router.pathname === '/search'}>
          <SearchNavIcon />
          <span>
              Search
          </span>
        </NavItem>
        <NavItem onClick={() => Router.push('/favs')} active={router.pathname === '/favs'}>
          <FavoritesNavIcon />
          <span>
              Favs
          </span>
        </NavItem>
      </NavList>
    </Nav>
  </NavigationWrapper>
);

Navigation.propTypes = {
  router: PropTypes.instanceOf(Object).isRequired
};

export default withRouter(Navigation);
