import React from 'react';

class BoardItem extends React.Component {
  render() {
    return (
      <li>
        <a target="_blank" href={this.props.url}>{this.props.name}</a>
      </li>
    );
  }
}

export default BoardItem;
