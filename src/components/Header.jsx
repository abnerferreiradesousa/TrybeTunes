import React from 'react';
import { Link } from 'react-router-dom';
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
    this.handleSetResponse(response);
  }

  handleSetResponse = (response) => {
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
        <Link to="/search" data-testid="link-to-search" />
        <Link to="/favorites" data-testid="link-to-favorites" />
        <Link to="/profile" data-testid="link-to-profile" />

      </div>
    );
  }
}

export default Header;
