import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesForm extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="expenses">
          Despesa
          <input type="number" id="expenses" data-testid="value-input" />
        </label>
        <label htmlFor="description">
          Descrição
          <input type="text" id="description" data-testid="description-input" />
        </label>
        <label htmlFor="currency">
          Moeda
          <select id="currency">
            {currencies.map((currency) => (
              <option value={ currency } key={ currency }>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento
          <select id="method" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select id="tag" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
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
