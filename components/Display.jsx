import React from 'react';
import {DisplayWrapper} from './Wrappers';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <DisplayWrapper>
        Current weather
      </DisplayWrapper>
    );
  }
}

export default Display;