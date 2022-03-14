import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import Footer from '../components/Footer';
import '../styles/Login.css';
import '../styles/Default.css';

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

  handleValidate = () => {
    const { recName } = this.state;
    return recName.length >= MINIMUM_CHARACTERS;
  };

  handleInputChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  render() {
    const { recName, savingUser, responseCome } = this.state;
    return (
      <section className="login-content-page">
        { responseCome ? <Redirect to="/search" /> : null }
        <section data-testid="page-login" className="form-content">
          <form action="" className="login__form">
            <label htmlFor="input-name">
              <input
                className="width-content"
                type="text"
                id="recName"
                data-testid="login-name-input"
                placeholder="Nome"
                value={ recName }
                onChange={ this.handleInputChange }
              />
            </label>
            <button
              type="button"
              className="width-content button-container-login"
              data-testid="login-submit-button"
              disabled={ !this.handleValidate() }
              onClick={ this.handleSendUser }
            >
              ENTRAR
            </button>
            { savingUser ? <Loading /> : null }
          </form>
        </section>
        <section className="footer-container">
          <Footer />
        </section>
      </section>
    );
  }
}

export default Login;
