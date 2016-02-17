import React from 'react';

class BoardItem extends React.Component {
  handleClick() {
    const range = document.createRange();
    const selection = getSelection()
    range.setStart(this.refs.name, 0);
    range.setEnd(this.refs.name, 1);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
  }

  render() {
    return (
      <li className="board__lang-item">
        <a className="board__link" target="_blank" href={this.props.url}
          ref="name">{this.props.name}</a>
        <a role="button" onClick={this.handleClick.bind(this)}>c</a>
      </li>
    );
  }
}

export default BoardItem;
