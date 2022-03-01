import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../styles/Header.css';

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
      <section data-testid="header-component">
        {hasResponse
          ? <Loading />
          : (
            <section>
              <section className="header-content">
                <Link
                  to="/search"
                  className="link-content"
                  data-testid="link-to-search"
                >
                  PESQUISA
                </Link>
                <Link
                  to="/favorites"
                  className="link-content"
                  data-testid="link-to-favorites"
                >
                  FAVORITAS
                </Link>
                <Link
                  to="/"
                  className="link-content"
                  data-testid="link-to-profile"
                >
                  LOG OUT
                </Link>
              </section>
              <div className="user_name">
                <h1
                  data-testid="header-user-name"
                >
                  {`Olá ${userObj.name}, o que vamos ouvir hoje?`}
                </h1>
              </div>
            </section>
          )}
      </section>
    );
  }
}

export default Header;
