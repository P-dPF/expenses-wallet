import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';
import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

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
          <span data-testid="total-field">Total de despesas</span>
        </header>
        <main>
          <ExpensesForm />
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
