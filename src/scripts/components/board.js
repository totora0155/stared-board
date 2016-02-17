import React from 'react';
import ReactDOM from 'react-dom';
import map from 'lodash.map';
import BoardList from 'components/board-list';
import Masonry from 'masonry-layout';

class Board extends React.Component {
  componentDidMount() {
    new Masonry(this.refs.boardList, {
      itemSelector: '.board__lang-box',
      columnWidth: 200,
    });
  }

  render() {
    const boardLists = map(this.props.data, (langData) => {
      return <BoardList key={langData.lang} data={langData}/>
    });
    return (
      <div>
        <h1>Hi, {this.props.name}!</h1>
        <ul className="board__list" ref="boardList">{boardLists}</ul>
      </div>
    );
  }
}

export default Board;
