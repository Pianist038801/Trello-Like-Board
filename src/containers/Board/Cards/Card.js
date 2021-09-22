import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AddButton from "../../Elements/AddButton";

import * as CardActions from "../../../actions/card";
import DelButton from "../../Elements/DelButton";

function mapStateToProps(state) {
  return {
    lists: state.lists.lists,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CardActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Card extends Component {
  static propTypes = {
    style: PropTypes.object,
    item: PropTypes.object,
    addEmail: PropTypes.func.isRequired,
    deleteEmail: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.deleteEmail = this.deleteEmail.bind(this);
    this.delCard = this.delCard.bind(this);
  }

  onClick(newStr) {
    const { addEmail, x, y } = this.props;
    addEmail(x, y, newStr);
  }

  deleteEmail(id) {
    const { deleteEmail, x, y } = this.props;
    deleteEmail(x, y, id);
  }

  delCard() {
    const { x, y, deleteCard } = this.props;
    deleteCard(x, y);
  }

  render() {
    const { style, item } = this.props;
    const { emails } = item;

    return (
      <div style={style} className="item" id={style ? item.id : null}>
        <div className="item-name">
          {item.title} <DelButton onClick={this.delCard} />
        </div>
        <div className="item-container">
          <div className="item-content">
            <ul>
              {emails.map((email, id) => (
                <li key={id}>
                  {email}
                  <DelButton
                    onClick={() => {
                      this.deleteEmail(id);
                    }}
                  />
                </li>
              ))}
            </ul>
            <AddButton onClick={this.onClick} />
          </div>
        </div>
      </div>
    );
  }
}
