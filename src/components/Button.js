import React from "react";
import PropTypes from "prop-types";

import "../styles/styles.css";

function Button({ children, onClick }) {
  return (
    <div className="containerBtn-loadMore">
      <button className="Button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
export default Button;

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
