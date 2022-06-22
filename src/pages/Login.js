import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLoginInfo } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const MIN_PASSWORD_LENGTH = 6;
      if (
        password.length >= MIN_PASSWORD_LENGTH
        && email.includes('@')
        && email.includes('.com')
      ) {
        return this.setState({ disabled: false });
      }
      return this.setState({ disabled: true });
    });
  }

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    dispatch(getLoginInfo(email));
  }

  render() {
    const { /* email, */ disabled } = this.state;
    // const { dispatch } = this.props;
    return (
      <>
        <div>Login</div>
        <form>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            minLength={ 6 }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ disabled }
            onClick={ () => this.handleClick() }
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
