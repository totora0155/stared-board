import React from 'react';
import ReactDOM from 'react-dom';
import map from 'lodash.map';
import BoardList from 'components/board-list';
import Masonry from 'masonry-layout';
import Alert from 'components/alert';
import Startup from 'components/startup';
import storage from 'modules/storage';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    storage.get('user', true)
      .then((data) => {
        if (data.user) {
          this.setState({user: data.user});
        }
      });
  }

  setUser(user) {
    this.setState({user});
  }

  componentDidMount() {
    const {alert, boardList} = this.refs;
    new Masonry(this.refs.boardList, {
      itemSelector: '.board__lang-box',
      columnWidth: 200,
    });

    alert.test();
  }

  render() {
    console.log(this);
    let component = null;
    if (this.state.user) {
      const boardLists = map(this.props.data, (langData) => {
        return <BoardList key={langData.lang} data={langData}/>
      });
      component = (
        <div>
          <h1>Hi, {this.props.name}!</h1>
          <ul className="board__list" ref="boardList">{boardLists}</ul>
        </div>
      );
    } else {
      component = <Startup/>;
    }

    return (
      <div>
        {component}
        <Alert ref="alert"/>
      </div>
    );
  }
}

export default Board;
