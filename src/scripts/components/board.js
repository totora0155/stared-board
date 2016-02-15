import React from 'react';
import map from 'lodash.map';
import BoardCard from 'components/board-card';

class Board extends React.Component {
  render() {
    const boardCards = map(this.props.data, (langData) => {
      return <BoardCard key={langData.lang} data={langData}/>
    });
    return (
      <div>
        <h1>Hi, {this.props.name}!</h1>
        <ul>{boardCards}</ul>
      </div>
    );
  }
}

export default Board;
