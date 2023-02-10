import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import '../styles/expensesForm.css';

class Form extends React.Component {
  render() {
    const {
      onChange,
      value,
      description,
      currency,
      method,
      tag,
      onClick,
      currencies,
      paymentMethods,
      categories,
      btnLabel,
      className,
    } = this.props;
    return (
      <form className={ className }>
        <div>
          <Input
            placeholder="Valor"
            type="number"
            name="value"
            value={ value }
            onChange={ onChange }
            id="value-input"
          />
          <Input
            placeholder="Descrição"
            type="text"
            name="description"
            value={ description }
            onChange={ onChange }
            id="description-input"
          />
        </div>
        <div>
          <Select
            label="Moeda: "
            name="currency"
            id="currency-input"
            onChange={ onChange }
            value={ currency }
            options={ currencies }
          />
          <Select
            label="Forma de pagamento: "
            name="method"
            id="method-input"
            onChange={ onChange }
            value={ method }
            options={ paymentMethods }
          />
          <Select
            label="Categoria: "
            name="tag"
            id="tag-input"
            onChange={ onChange }
            value={ tag }
            options={ categories }
          />
        </div>
        <div>
          <Button
            label={ btnLabel }
            onClick={ onClick }
          />
        </div>
      </form>);
  }
}

Form.propTypes = {
  onChange: PropTypes.func,
}.isRequired;

export default Form;
