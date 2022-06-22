import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  render() {
    return (
      <>
        <div>Login</div>
        <form>
          <input type="email" data-testid="email-input" />
          <input type="password" data-testid="password-input" />
          <button type="button">Entrar</button>
        </form>
      </>
    );
  }
}

export default connect()(Login);
