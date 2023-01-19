import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/login.css'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisable: true,
      login: '',
      loading: false,
    };
  }

  changeButtonState = () => {
    const { login } = this.state;
    const limitNumber = 3;
    if (login.length >= limitNumber) {
      this.setState({
        buttonDisable: false,
      });
    } else {
      this.setState({
        buttonDisable: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.changeButtonState();
    });
  }

  loadingScreen = async () => {
    const { login } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: login });
    this.setState({
      loading: false,
    });
  }

  redirectToSearch = () => {
    const { history } = this.props;
    history.push('/search');
  }

  buttonClick = async () => {
    await this.loadingScreen();
    this.redirectToSearch();
  }

  render() {
    const { buttonDisable, login, loading } = this.state;
    if (!loading) {
      return (
        <div data-testid="page-login">
          <header>
            Login
          </header>

          <br />

          <form>
            <label htmlFor="login" name="login">
              Nome de usuário
              <br />
              <input
                type="text"
                name="login"
                value={ login }
                onChange={ this.handleChange }
                data-testid="login-name-input"
              />
            </label>

            <button
              type="button"
              disabled={ buttonDisable }
              data-testid="login-submit-button"
              onClick={ this.buttonClick }
            >
              Entrar
            </button>
            <br />
          </form>
        </div>
      );
    } return <Loading />;
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
