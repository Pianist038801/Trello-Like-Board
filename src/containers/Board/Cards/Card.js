import React, { PropTypes } from "react";

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object,
};

const Card = (props) => {
  const { style, item } = props;

  return (
    <div style={style} className="item" id={style ? item.id : null}>
      <div className="item-name">{item.title}</div>
      <div className="item-container">
        <div className="item-content">
          <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <li>consectetur adipisicing elit.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
