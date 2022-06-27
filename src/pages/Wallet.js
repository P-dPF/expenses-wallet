import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, addExpense, fetchExchangeRates } from '../actions';
import ExpensesTable from '../components/ExpensesTable';
import Form from '../components/Form';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
  totalExpenses: 0,
};
class Wallet extends React.Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  sum = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const convertedValues = expenses.map((expense) => (
        Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask)));
      const convertedSum = convertedValues.reduce((acc, curr) => (acc + curr)).toFixed(2);
      this.setState({ totalExpenses: convertedSum, value: '', description: '' });
    }
    if (expenses.length === 0) {
      this.setState({ totalExpenses: 0 });
    }
  }

  buildExpenseObj = async () => {
    const { dispatch } = this.props;
    const APIresponse = await fetchExchangeRates()();
    this.setState({ exchangeRates: APIresponse }, () => {
      const { value, description, currency, method, tag, exchangeRates } = this.state;
      const expenseObj = {
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      };
      dispatch(addExpense(expenseObj));
    });
    this.sum();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, currencies } = this.props;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const {
      value,
      description,
      currency,
      method,
      tag,
      totalExpenses,
    } = this.state;
    return (
      <>
        <div>TrybeWallet</div>
        <header>
          <span>TrybeWallet de:</span>
          <span data-testid="email-field">{email}</span>
          <span>Câmbio atual:</span>
          <span data-testid="header-currency-field">BRL</span>
          <span>Total de despesas:</span>
          <span data-testid="total-field">{totalExpenses}</span>
        </header>
        <main>
          <Form
            onChange={ this.handleChange }
            value={ value }
            description={ description }
            currency={ currency }
            method={ method }
            tag={ tag }
            currencies={ currencies }
            paymentMethods={ paymentMethods }
            categories={ categories }
            onClick={ this.buildExpenseObj }
          />
          <div>
            <ExpensesTable sum={ this.sum } />
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  email: state.user.email,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
