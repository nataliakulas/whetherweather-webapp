import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import theme from '../shared/theme';

const InputRadioWrapper = styled.label`
  width: 155px;
  position: relative;
  display: table;
  font-size: 14px;
  line-height: 22px;
  margin: 10px;
  padding-left: 50px;
  
  input:checked,
  input:not(:checked) {
      position: absolute;
      left: -9999px;
  }
  
  input:checked + span,
  input:not(:checked) + span  {
      position: absolute;
      top:0;
      left: 0; 
      cursor: pointer;
      display: inline-block;
  }
  
  input:checked + span:before,
  input:not(:checked) + span:before {
      content: '';
      position: absolute;
      left: 15px;
      top: 0;
      width: 20px;
      height: 20px;
      border: 1px solid ${theme.tertiaryBlue};
      border-radius: 100%;
      background: ${theme.light};
  }
  
  input:checked + span:after,
  input:not(:checked) + span:after {
      content: '';
      width: 10px;
      height: 10px;
      background: ${theme.tertiaryBlue};
      position: absolute;
      top: 6px;
      left: 21px;
      border-radius: 100%;
      -webkit-transition: all 0.2s ease;
      transition: all 0.2s ease;
  }
  
  input:not(:checked) + span:after {
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
  }
  
  input:checked + span:after {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
  } 
`;

const InputRadio = ({ children, name, checked, onChange }) => (
  <InputRadioWrapper htmlFor={name}>
    <input
      id="name"
      type="radio"
      checked={checked}
      onChange={onChange}
    />
    <span />
    {children}
  </InputRadioWrapper>
);

InputRadio.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputRadio;