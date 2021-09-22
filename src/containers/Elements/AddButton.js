import React, { Component, PropTypes } from "react";

export default class AddButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      newStr: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  onBlur() {
    const { onClick } = this.props;
    this.setState({ isClicked: false });
    onClick(this.state.newStr);
  }

  handleChange(e) {
    this.setState({ newStr: e.target.value });
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.onBlur();
    }
  }
  render() {
    const { isClicked, newStr } = this.state;
    if (isClicked) {
      return (
        <input
          type="text"
          style={{ width: "100%" }}
          value={newStr}
          onChange={this.handleChange}
          onBlur={this.onBlur}
          onKeyPress={this.handleKeyDown}
        />
      );
    }
    return (
      <button
        className="item"
        onClick={(e) => {
          this.setState({ isClicked: true, newStr: "" });
        }}
      >
        {" "}
        + Add{" "}
      </button>
    );
  }
}
