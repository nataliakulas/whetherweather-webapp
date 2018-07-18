import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import styled from 'styled-components';
import { NavigationWrapper } from './Styles';
import theme from '../shared/theme';


const Nav = styled.nav`
    width: 100%;
    height: calc(100% + 2px);
         
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: -1px;
`;

const NavList = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    margin: 0;
    padding: 0;
    
    @media (min-width: 992px) {
        flex-direction: column;  
    }    
`;

const NavItem = styled.li`
    width: calc(100% / 3);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ active }) => active ? theme.tertiaryBlue : theme.secondaryBlue};
    cursor: ${({ active }) => active ? 'default' : 'pointer'};
    padding: 12px;
    
    &:hover {
        background-color: ${({ active }) => active ? theme.tertiaryBlue : theme.tertiaryBlue.saturate(0.5)};
     }
    
    span {
        font-family: OpenSansRegular, sans-serif;
        font-size: 12px;
        line-height: 17px;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        text-decoration: none;
        color: ${theme.light};
        margin-top: 8px;
    }
    
    @media (min-width: 992px) {
           padding: 20px;
           width: 100%;
            
    span {
        font-size: 14px;
        margin-top: 10px;
        }
    }
`;

const NavIcon = styled.div`
    width: 30px;
    height: 30px;
    background-size: 30px;
    background-position: center;
    background-repeat: no-repeat;   
    
    @media (min-width: 992px) {
        width: 50px;
        height: 50px;
        background-size: 50px;
    }
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
        <NavItem onClick={() => Router.push('/', '/location')} active={router.pathname === ('/' || '/location')}>
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
