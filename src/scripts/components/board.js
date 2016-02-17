import React from 'react';
import ReactDOM from 'react-dom';
import map from 'lodash.map';
import BoardList from 'components/board-list';
import Masonry from 'masonry-layout';
import Alert from 'components/alert';

class Board extends React.Component {
  componentDidMount() {
    const {alert, boardList} = this.refs;
    new Masonry(this.refs.boardList, {
      itemSelector: '.board__lang-box',
      columnWidth: 200,
    });

    alert.test();
  }

  render() {
    const boardLists = map(this.props.data, (langData) => {
      return <BoardList key={langData.lang} data={langData}/>
    });
    return (
      <div>
        <div>
          <h1>Hi, {this.props.name}!</h1>
          <ul className="board__list" ref="boardList">{boardLists}</ul>
        </div>
        <Alert ref="alert"/>
      </div>
    );
  }
}

export default Board;
