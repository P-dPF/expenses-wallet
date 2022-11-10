import React from 'react';
import PropTypes from 'prop-types';
import '../styles/loginButton.css';

class Input extends React.Component {
  render() {
    const { placeholder, type, name, value, onChange, id, className } = this.props;
    return (
      <input
        type={ type }
        name={ name }
        value={ value }
        onChange={ onChange }
        data-testid={ id }
        placeholder={ placeholder }
        className={ className }
      />
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
}.isRequired;

export default Input;
