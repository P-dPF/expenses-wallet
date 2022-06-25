import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';

class ExpensesTable extends React.Component {
  convertValue = (object, value, currency, exchangeRates) => (
    object[value] * object[exchangeRates][object[currency]].ask
  )

  render() {
    const { expensesList } = this.props;
    console.log(expensesList);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expensesList.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>
                {
                  // Referência: https://stackoverflow.com/questions/3568921/how-to-remove-part-of-a-string
                  expense.exchangeRates[expense.currency].name.split('/').shift()
                }
              </td>
              <td>
                {
                  Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                }

              </td>
              <td>
                {
                  (expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <Button
                  label="Excuir despesa"
                  onClick={ () => {} }
                  id="delete-btn"
                />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesList: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expensesList: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(ExpensesTable);
