import React from 'react';
import PropTypes from 'prop-types';
import '../styles/loginButton.css';

class Button extends React.Component {
  render() {
    const { label, onClick, disabled, className } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ disabled }
        className={ className }
      >
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  className: '',
};

export default Button;
