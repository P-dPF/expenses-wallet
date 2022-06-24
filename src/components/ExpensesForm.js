import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchExchangeRates } from '../actions';

class ExpensesForm extends React.Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    exchangeRates: {},
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

  render() {
    const { currencies } = this.props;
    return (
      <>
        <form>
          <label htmlFor="value-input">
            Despesa
            <input
              type="number"
              name="value"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição
            <input
              type="text"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              name="currency"
              data-testid="currency-input"
              id="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((currency) => (
                <option value={ currency } key={ currency }>{currency}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento
            <select
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria
            <select
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.buildExpenseObj }
          >
            Adicionar despesa
          </button>
        </form>
        <p>
          Total de despesas:
          <span data-testid="total-field">{0}</span>
        </p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpensesForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(ExpensesForm);
