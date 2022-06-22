import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <div>TrybeWallet</div>
        <header>
          TrybeWallet de:
          <span data-testid="email-field">{email}</span>
          Saldo:
          <span data-testid="total-field">{0}</span>
          Câmbio atual:
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);
