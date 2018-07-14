import styled from 'styled-components';
import theme from '../shared/theme';

export const BackgroundWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${theme.secondaryBlue};
    overflow: hidden;
`;

export const ViewWrapper = styled.section`
    width: 100%;
    height: 600px;
    position: relative;
    background-color: ${theme.primaryBlue};
    padding: 20px;
`;

export const NavigationWrapper = styled.header`
    width: 100%;
    height: 600px;
    text-align: center;
    background-color: ${theme.tertiaryBlue};
    padding: 20px;
                   
    &::before,
    &::after {
        content: ' ';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        background-color: ${theme.tertiaryBlue.saturate(0.35)};
    }
        
    &::before {
        top:-100%;      
    }
    
    &::after {
        bottom:-100%;
    }
`;

export const DisplayWrapper=styled.aside`
    width: 100%;
    height: 600px;
    position: relative;
    background-color: ${theme.light};  
    padding: 20px;
`;
