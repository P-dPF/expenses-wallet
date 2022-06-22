import React from 'react';
import { connect } from 'react-redux';

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

  render() {
    const { disabled } = this.state;
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
            // minLength={ 6 }
            onChange={ this.handleChange }
          />
          <button type="button" disabled={ disabled }>Entrar</button>
        </form>
      </>
    );
  }
}

export default connect()(Login);
