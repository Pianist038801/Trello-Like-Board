import React, { Component, PropTypes } from "react";

export default class DelButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <button className="delete-button" onClick={this.props.onClick}>
        Del
      </button>
    );
  }
}
