import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, addExpense, fetchExchangeRates } from '../actions';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import ExpensesTable from '../components/ExpensesTable';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: '',
  method: '',
  tag: '',
  exchangeRates: {},
  convertedExpensesList: [],
  totalExpenses: 0,
};
class Wallet extends React.Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  sumConvertedExpenses = (originalCurrency, ask) => {
    const { value, exchangeRates } = this.state;
    const convertedExpense = value * exchangeRates[originalCurrency][ask];
    this.setState((prevState) => ({
      convertedExpensesList: [...prevState.convertedExpensesList, convertedExpense],
    }), () => {
      const { convertedExpensesList } = this.state;
      const sum = convertedExpensesList.reduce((acc, curr) => acc + curr).toFixed(2);
      this.setState({ totalExpenses: sum, value: '' });
    });
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
      this.sumConvertedExpenses(currency, 'ask');
      dispatch(addExpense(expenseObj));
    });
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
      // currency,
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
          <Input
            label="Despesa: "
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            id="value-input"
          />
          <Input
            label="Descrição: "
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            id="description-input"
          />
          {/* <Select
            label="Moeda"
            name="currency"
            id="currency-input"
            onChange={ this.handleChange }
            value={ currency }
            options={ currencies }
          /> */}
          <label htmlFor="currency-input">
            Moeda
            <select
              name="currency"
              data-testid="currency-input"
              id="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((curr) => (
                <option value={ curr } key={ curr }>{curr}</option>
              ))}
            </select>
          </label>
          <Select
            label="Forma de pagamento: "
            name="method"
            id="method-input"
            onChange={ this.handleChange }
            value={ method }
            options={ paymentMethods }
          />
          <Select
            label="Categoria: "
            name="tag"
            id="tag-input"
            onChange={ this.handleChange }
            value={ tag }
            options={ categories }
          />
          <Button
            label="Adicionar despesa"
            onClick={ this.buildExpenseObj }
          />
          <div>
            <ExpensesTable />
          </div>
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
