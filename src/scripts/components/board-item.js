import React from 'react';

class BoardItem extends React.Component {
  render() {
    return (
      <li className="board__lang-item">
        <a className="board__link" target="_blank" href={this.props.url}>{this.props.name}</a>
      </li>
    );
  }
}

export default BoardItem;
