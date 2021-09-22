import React, { Component, PropTypes } from "react";
import { DropTarget, DragSource } from "react-dnd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ListActions from "../../../actions/lists";

import Cards from "./Cards";
import DelButton from "../../Elements/DelButton";

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x,
    };
  },
  endDrag(props) {
    props.stopScrolling();
  },
};

const listTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling("toRight");
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling("toLeft");
      }
    } else {
      if (
        window.innerWidth - monitor.getClientOffset().x > 200 &&
        monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }
    const { id: listId } = monitor.getItem();
    const { id: nextX } = props;
    if (listId !== nextX) {
      props.moveList(listId, props.x);
    }
  },
};

function mapStateToProps(state) {
  return {
    lists: state.lists.lists,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@DropTarget("list", listTarget, (connectDragSource) => ({
  connectDropTarget: connectDragSource.dropTarget(),
}))
@DragSource("list", listSource, (connectDragSource, monitor) => ({
  connectDragSource: connectDragSource.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class CardsContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }
  onDelete() {
    const { x, deleteList } = this.props;
    deleteList(x);
  }

  render() {
    const {
      connectDropTarget,
      connectDragSource,
      item,
      x,
      moveCard,
      isDragging,
    } = this.props;
    const opacity = isDragging ? 0.5 : 1;

    return connectDragSource(
      connectDropTarget(
        <div className="desk" style={{ opacity }}>
          <div className="desk-head">
            <div className="desk-name">
              {item.name}
              <DelButton onClick={this.onDelete} />
            </div>
          </div>
          <Cards
            moveCard={moveCard}
            x={x}
            cards={item.cards}
            startScrolling={this.props.startScrolling}
            stopScrolling={this.props.stopScrolling}
            isScrolling={this.props.isScrolling}
          />
        </div>
      )
    );
  }
}
