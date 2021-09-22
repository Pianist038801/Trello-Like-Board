import React, { PropTypes } from "react";

export default function DelButton({ onClick }) {
  return (
    <button className="delete-button" onClick={onClick}>
      Del
    </button>
  );
}

DelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
