import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies,
  addExpense,
  fetchExchangeRates,
  editExpense,
  deleteExpense,
} from '../actions';
import ExpensesTable from '../components/ExpensesTable';
import Form from '../components/Form';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
  totalExpense: 0,
};
class Wallet extends React.Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  totalSum = () => {
    const { expenses = [] } = this.props;
    const convertedValues = expenses.map((expense) => Number(expense.value)
        * Number(expense.exchangeRates[expense.currency].ask));
    const convertedSum = Number(convertedValues
      .reduce((acc, curr) => (acc + curr), 0).toFixed(2));
    return convertedSum;
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
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  reviewExpense = async () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newExpenseObj = {
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(editExpense(newExpenseObj));
  }

  handleClick = async () => {
    await this.buildExpenseObj();
    this.totalSum();
    const { totalExpense, ...rest } = INITIAL_STATE;
    this.setState({ ...rest });
  }

  handleEditClick = async () => {
    await this.reviewExpense();
    this.totalSum();
    const { totalExpense, ...rest } = INITIAL_STATE;
    this.setState({ ...rest });
  }

  deleteExpense = async ({ target }) => {
    const { dispatch } = this.props;
    const id = Number(target.id);
    await dispatch(deleteExpense(id));
    this.totalSum();
    const { totalExpense, ...rest } = INITIAL_STATE;
    this.setState({ ...rest });
  }

  render() {
    const { email, currencies, editor } = this.props;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const addForm = (
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
        onClick={ this.handleClick }
        btnLabel="Adicionar despesa"
        className="add-expenses-form"
      />
    );
    const editForm = (
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
        onClick={ this.handleEditClick }
        btnLabel="Editar despesa"
      />
    );
    return (
      <div className="expense-page">
        <header className="expenses-header">
          <span>
            {'TrybeWallet de: '}
            <span data-testid="email-field">{email}</span>
          </span>
          <span>
            {'Câmbio atual: '}
            <span data-testid="header-currency-field">BRL</span>
          </span>
          <span>
            {'Total de despesas: '}
            <span data-testid="total-field">{this.totalSum()}</span>
          </span>
        </header>
        <main>
          {editor ? editForm : addForm}
          <ExpensesTable
            totalSum={ this.totalSum }
            deleteExpense={ this.deleteExpense }
          />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  email: state.user.email,
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  total: state.wallet.total,
});

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
