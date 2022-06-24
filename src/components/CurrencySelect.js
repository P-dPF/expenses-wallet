import React from 'react';
import PropTypes from 'prop-types';

class CurrencySelect extends React.Component {
  render() {
    const { name, id, onChange, value, options } = this.props;
    return (
      <label htmlFor={ id }>
        Moeda
        <select
          name={ name }
          data-testid={ id }
          onChange={ onChange }
          value={ value }
        >
          {
            options.map((option) => (
              <option key={ option } value={ option }>{option}</option>
            ))
          }
        </select>
      </label>
    );
  }
}

CurrencySelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
}.isRequired;

export default CurrencySelect;
