import React from 'react';
import PropTypes from 'prop-types';
import '../styled/spinner.css';

function Spinner({ className }) {
  return (
    <div className={`spinner ${className}`} />
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
};

Spinner.defaultProps = {
  className: '',
};

export default Spinner;
