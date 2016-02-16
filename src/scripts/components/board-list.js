import React from 'react';
import ReactDOM from 'react-dom';
import map from 'lodash.map';
import BoardItem from 'components/board-item';

class BoardList extends React.Component {
  render() {
    const boardItems = map(this.props.data.stared, (item) => {
      return <BoardItem key={item.name} url={item.html_url} name={item.name}/>
    });
    return (
      <li className="board__lang-box">
        <h2>{this.props.data.lang}</h2>
        <ul>{boardItems}</ul>
      </li>
    );
  }
}

export default BoardList;
