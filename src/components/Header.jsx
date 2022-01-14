import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      hasResponse: true,
      userObj: {},
    };
  }

  async componentDidMount() {
    const response = await getUser();
    if (response) {
      return this.setState({
        hasResponse: false,
        userObj: response,
      });
    }
  }

  render() {
    const { hasResponse, userObj } = this.state;
    return (
      <div data-testid="header-component">
        {hasResponse ? <Loading /> : null}
        <h1 data-testid="header-user-name">{userObj.name}</h1>
      </div>
    );
  }
}

export default Header;
