import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLoginInfo } from '../actions';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/Login.css';
import '../styles/loginInput.css';

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
    const { email, password, disabled } = this.state;
    return (
      <div className="login-box">
        <div className="title">
          Trybe
          <strong>Wallet</strong>
        </div>
        <form className="form">
          <Input
            placeholder="Email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            id="email-input"
            className="login-input"
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            id="password-input"
            className="login-input"
          />
          <Button
            label="Entrar"
            disabled={ disabled }
            onClick={ this.handleClick }
            className="button"
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null, null)(Login);
