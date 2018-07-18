import styled from 'styled-components';
import theme from '../shared/theme';

export const BackgroundWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${theme.secondaryBlue};
    color: ${theme.medium};
    overflow: hidden;           
`;

export const ViewWrapper = styled.section`
    width: 100%;
    height: 525px;
    position: relative;
    background-color: ${theme.primaryBlue};
    border: 1px solid transparent;
    border-radius: 0 2px 2px 0;
    padding: 20px;
`;

export const NavigationWrapper = styled.header`
    width: 100%;
    height: 525px;
    text-align: center;
    background-color: ${theme.secondaryBlue};
    border: 1px solid transparent;
                   
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

export const DisplayWrapper = styled.aside`
    width: 100%;
    height: 525px;
    position: relative;
    background-color: ${theme.light};  
    border: 1px solid transparent;
    border-radius: 2px 0 0 2px;
    padding: 20px 0;
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: 340px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const BoxWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;

  > div {
    align-items: center !important;
    margin: 0 !important;
  }
`;

export const PanelWrapper = styled.div`
  width: 85%;
  height: 165px;
  margin: 0 auto;
  padding: 20px 45px;
  background-color: ${theme.primaryBlue};
  border: 1px solid ${theme.primaryBlue};
  border-radius: 2px;
`;

export const ColumnWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const RowBetweenWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const RowAroundWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const SelectWrapper = styled.div`
    width: 100%;
    max-width: 275px;

.Select {
  position: relative;
  margin: 30px 0;
}

.Select input::-webkit-contacts-auto-fill-button,
.Select input::-webkit-credentials-auto-fill-button {
  display: none !important;
}

.Select input::-ms-clear {
  display: none !important;
}

.Select input::-ms-reveal {
  display: none !important;
}

.Select.is-disabled .Select-arrow-zone {
  cursor: default;
  pointer-events: none;
  opacity: 0.35;
}

.Select.is-disabled > .Select-control {
  background-color: ${theme.primaryBlue};
  cursor: not-allowed;
}

.Select.is-disabled > .Select-control:hover {
  box-shadow: none;
}

.Select.is-open > .Select-control {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  
  background: ${theme.light};
  border-color: ${theme.primaryBlue};
}

.Select.is-open > .Select-control .Select-arrow {
  top: -2px;
  border-color: transparent transparent ${theme.primaryBlue}
  border-width: 0 5px 5px;
}

.Select.is-searchable.is-open > .Select-control {
  cursor: text;
}

.Select.is-searchable.is-focused:not(.is-open) > .Select-control {
  cursor: text;
}

.Select.is-focused > .Select-control {
  border: 1px solid ${theme.tertiaryBlue.saturate(0.5)};
  background: ${theme.white};
}

.Select.is-focused:not(.is-open) > .Select-control {
  border-color: ${theme.tertiaryBlue.saturate(0.5)};
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);
  background: ${theme.white};
}

.Select.has-value.is-clearable.Select--single > .Select-control .Select-value {
  padding-right: 42px;
}

.Select.has-value.Select--single > .Select-control .Select-value .Select-value-label,
.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value .Select-value-label {
  color: ${theme.medium};
}

.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label,
.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label {
  cursor: pointer;
  text-decoration: none;
}

.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:hover,
.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:hover,
.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:focus,
.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:focus {
  color: ${theme.tertiaryBlue};
  outline: none;
  text-decoration: underline;
}

.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:focus,
.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:focus {
  background: ${theme.white};
}

.Select.has-value.is-pseudo-focused .Select-input {
  opacity: 0;
}

.Select.is-open .Select-arrow,
.Select .Select-arrow-zone:hover > .Select-arrow {
  border-top-color: ${theme.tertiaryBlue.saturate(0.5)};
}

.Select.Select--rtl {
  direction: rtl;
  text-align: right;
}

.Select-control {
  width: 100%;
  height: 38px;
  position: relative;
  display: table;
  color: ${theme.medium};
  background-color: ${theme.light};
  border-radius: 0;
  border: 1px solid ${theme.tertiaryBlue};
  border-spacing: 0;
  border-collapse: separate;
  cursor: default;
  outline: none;
  overflow: hidden;
}

.Select-control .Select-input:focus {
  outline: none;
  background-color: ${theme.light};
}

.Select-placeholder,
.Select--single > .Select-control .Select-value {
  bottom: 0;
  color: ${theme.tertiaryBlue};
  line-height: 34px;
  left: 0;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  right: 0;
  top: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.Select-input {
  height: 36px;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
}

.Select-input > input {
  width: 100%;
  background: none transparent;
  border: 0 none;
  box-shadow: none;
  cursor: default;
  display: inline-block;
  font-family: inherit;
  font-size: inherit;
  line-height: 34px;
  margin: 0;
  outline: none;
}

.is-focused .Select-input > input {
  cursor: text;
}

.has-value.is-pseudo-focused .Select-input {
  opacity: 0;
}

.Select-control:not(.is-searchable) > .Select-input {
  outline: none;
}

.Select-loading-zone {
  cursor: pointer;
  display: table-cell;
  position: relative;
  text-align: center;
  vertical-align: middle;
  width: 16px;
}

.Select-loading {
  -webkit-animation: Select-animation-spin 400ms infinite linear;
  -o-animation: Select-animation-spin 400ms infinite linear;
  animation: Select-animation-spin 400ms infinite linear;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-right-color: #333;
  display: inline-block;
  position: relative;
  vertical-align: middle;
}

.Select-clear-zone {
  -webkit-animation: Select-animation-fadeIn 200ms;
  -o-animation: Select-animation-fadeIn 200ms;
  animation: Select-animation-fadeIn 200ms;
  color: ${theme.tertiaryBlue};
  cursor: pointer;
  display: table-cell;
  position: relative;
  text-align: center;
  vertical-align: middle;
  width: 17px;
}

.Select-clear-zone:hover {
  color: ${theme.red};
}

.Select-clear {
  display: inline-block;
  font-size: 16px;
  line-height: 1;
}

.Select--multi .Select-clear-zone {
  width: 17px;
}

.Select-arrow-zone {
  cursor: pointer;
  display: table-cell;
  position: relative;
  text-align: center;
  vertical-align: middle;
  width: 25px;
  padding-right: 5px;
}

.Select--rtl .Select-arrow-zone {
  padding-right: 0;
  padding-left: 5px;
}

.Select-arrow {
  border-color: ${theme.tertiaryBlue} transparent transparent;
  border-style: solid;
  border-width: 5px 5px 2.5px;
  display: inline-block;
  height: 0;
  width: 0;
  position: relative;
}

.Select-control > *:last-child {
  padding-right: 5px;
}

.Select--multi .Select-multi-value-wrapper {
  display: inline-block;
}

.Select .Select-aria-only {
  position: absolute;
  display: inline-block;
  height: 1px;
  width: 1px;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
  float: left;
}

@-webkit-keyframes Select-animation-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes Select-animation-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.Select-menu-outer {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background-color: ${theme.white};
  border: 1px solid ${theme.tertiaryBlue};
  border-top-color: ${theme.light};
  box-shadow: none;
  box-sizing: border-box;
  margin-top: -1px;
  max-height: 284px;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  z-index: 1;
  -webkit-overflow-scrolling: touch;
}

.Select-menu {
  max-height: 284px;
  overflow-y: auto;
}

.Select-option {
  height: 36px;
  box-sizing: border-box;
  background-color: ${theme.white};
  color: ${theme.medium};
  cursor: pointer;
  display: block;
  padding: 4px 10px;
}

.Select-option:last-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.Select-option.is-selected {
  background-color: ${theme.tertiaryBlue};
  color: ${theme.medium};
}

.Select-option.is-focused {
  background-color: ${theme.tertiaryBlue.saturate(0.5)};
  color: ${theme.medium};
}

.Select-option.is-disabled {
  color: ${theme.primaryBlue};
}

.Select-noresults {
  box-sizing: border-box;
  color: ${theme.tertiaryBlue};
  cursor: default;
  display: block;
  padding: 4px 10px;
}

@keyframes Select-animation-spin {
  to {
    transform: rotate(1turn);
  }
}

@-webkit-keyframes Select-animation-spin {
  to {
    -webkit-transform: rotate(1turn);
  }
}
`;

export const Button = styled.button`
  width: 100%;
  max-width: 275px;
  height: ${({ chunk }) => chunk ? '77px' : '38px' };
  margin: ${({ chunk }) => chunk ? '30px auto' : '8px auto' };
  background-color: ${theme.tertiaryBlue};
  border: 1px solid ${theme.tertiaryBlue};
  border-radius: 2px;
  color: ${theme.white};
  cursor: pointer;
  
  &:focus {
    outline-color: ${theme.tertiaryBlue.saturate(0.5)};
  }
  
  &:hover {
    &:not(:disabled) {
      background-color: ${theme.tertiaryBlue.saturate(0.5)};
      border: 1px solid ${theme.tertiaryBlue.saturate(0.5)};
    }
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity:0.25;
  }
`;

export const SquareButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${theme.tertiaryBlue};
  border: 1px solid ${theme.tertiaryBlue};
  border-radius: 2px;
  background-image: ${({ active }) => active ? 'url("/static/images/fav.svg")' : 'url("/static/images/unfav.svg")' };
  background-repeat: no-repeat;
  background-size: 35px;
  background-position: center;
  margin: 10px;
  cursor: pointer;
  
  &:focus {
    outline-color: ${theme.tertiaryBlue.saturate(0.5)};
  }
  
  &:hover {
    &:not(:disabled) {
      background-color: ${theme.tertiaryBlue.saturate(0.5)};
      border: 1px solid ${theme.tertiaryBlue.saturate(0.5)};
    }
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity:0.25;
  }
`;

export const Image = styled.img`
    width: 100px;
    height: 100px;
    margin: 10px;
`;

export const Input = styled.input`
    width: 100%;
    height: 38px;
    color: ${theme.medium};
    line-height: 34px;
    background-color: ${theme.light};
    border-radius: 0;
    border: 1px solid ${theme.tertiaryBlue};
    overflow: hidden;
    margin: 10px auto;
    padding-left: 10px;
    position: relative;
    
   &:focus {
    outline-color: ${theme.tertiaryBlue.saturate(0.5)};
  }
  
  &:hover {
    &:not(:disabled) {
      border: 1px solid ${theme.tertiaryBlue.saturate(0.5)};
    }
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity:0.25;
  }
    
    
    &::-webkit-input-placeholder {
      color: ${theme.tertiaryBlue};
    }
    
    &::-webkit-search-cancel-button {
     -webkit-appearance: none;
     
     width: 36px;
     height: 36px;
     
     position: absolute;
     top:0;
     right: 0;
     
     background-image: url("/static/images/cancel.svg");
     background-repeat: no-repeat;
     background-size: 9px;  
     background-position: center;
     cursor: pointer;
     
       &:hover {
       background-image: url("/static/images/cancel-hover.svg");
       }
     }        
`;