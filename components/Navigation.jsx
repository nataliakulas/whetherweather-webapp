import React from 'react';
import Link from 'next/link';
import {NavigationWrapper} from './Wrappers';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationWrapper>
        <nav>
          <Link href='/'>
            Home
          </Link>
        </nav>
      </NavigationWrapper>
    );
  }
}

export default Navigation;