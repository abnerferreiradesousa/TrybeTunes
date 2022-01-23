import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const MINIMUM_CHARACTERS = 3;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recName: '',
      savingUser: '',
      responseCome: '',
    };
  }

  handleSendUser = async (event) => {
    event.preventDefault();
    const { recName } = this.state;
    this.setState({ savingUser: true });
    const response = await createUser({ name: recName });
    if (response) this.setState({ responseCome: true });
    this.setState({ savingUser: false });
  };

  // v1
  // handleValidate = () => {
  //   const { recName } = this.state;
  //   if (recName.length >= MINIMUM_CHARACTERS) return true;
  //   return false;
  // }

  // v1
  // handleInputChange = ({ target: { id, value } }) => {
  //   this.setState({ [id]: value });
  //   this.handleValidate();
  // }

  // v2
  handleValidate = () => {
    const { recName } = this.state;
    return recName.length >= MINIMUM_CHARACTERS;
  };

  // v2
  handleInputChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  render() {
    const { recName, savingUser, responseCome } = this.state;
    return (
      <section>
        { responseCome ? <Redirect to="/search" /> : null }
        { savingUser ? <Loading /> : null }
        <div data-testid="page-login">
          <form action="">
            <label htmlFor="input-name">
              Digite seu nome
              <input
                type="text"
                id="recName"
                data-testid="login-name-input"
                value={ recName }
                onChange={ this.handleInputChange }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ !this.handleValidate() }
              onClick={ this.handleSendUser }
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
