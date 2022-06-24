import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { label, name, id, onChange, value, options } = this.props;
    return (
      <label htmlFor={ id }>
        {label}
        <select
          name={ name }
          data-testid={ id }
          onChange={ onChange }
          value={ value }
          id={ id }
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

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
}.isRequired;

export default Select;
