import styled from 'styled-components';
import theme from '../shared/theme';

export const BackgroundWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${theme.secondaryBlue};
`;

export const ViewWrapper = styled.section`
    width: 300px;
    height: 600px;
    position: relative;
    background-color: ${theme.primaryBlue};  
`;

export const NavigationWrapper = styled.header`
    width: 100px;
    height: 600px;
    text-align: center;
    background-color: ${theme.tertiaryBlue};
`;

export const DisplayWrapper=styled.aside`
    width: 200px;
    height: 600px;
    position: relative;
    background-color: ${theme.light};  
`;

