import React from 'react';
import ReactDOM from 'react-dom';
import map from 'lodash.map';
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';
import BoardList from 'components/board-list';
import Masonry from 'masonry-layout';
import Alert from 'components/alert';
import Startup from 'components/startup';
import request from 'modules/request';
import storage from 'modules/storage';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startup: this.props.user ? true : false,
    };
  }

  componentDidMount() {
    if (this.state.startup) {
      const {alert, boardList} = this.refs;
      this.getData().then((data) => {
        storage.set({data});
        this.setState({
          data,
          loadedData: true,
        });
        layout(boardList);
      });
    }

    function layout(boardList) {
      new Masonry(boardList, {
        itemSelector: '.board__lang-box',
        columnWidth: 200,
      });
    }
  }

  completeStartup() {
    this.getData().then((data) => {
      this.setState({
        data,
        startup: true,
      });
    });
  }

  getData(sync) {
    return (async function(user) {
      if (!sync) {
        const {data} = await storage.get('data');
        if (data) return data;
      }
      const res = await request.data(user);
      const data = JSON.parse(res);
      const grouped = groupBy(data, d => d.language);
      const maped = map(grouped, (starred, lang) => {
        const count = starred.length;
        const rate = starred.length / data.length;
        return {starred, lang, count, rate};
      });
      const sorted = sortBy(maped, d => d.count).reverse();
      return sorted;
    })(this.props.user);
  }

  handleSyncData() {
    this.getData(true).then(data => {
      this.setState({data});
      storage.set({data});
    });
  }

  render() {
    let component = null;
    if (this.state.startup) {
      const boardLists = map(this.state.data, (langData) => {
        return <BoardList key={langData.lang} data={langData}/>
      });
      component = (
        <div>
          <nav className="nav__box">
            <ul className="nav__list">
              <li className="nav__item">
                <h1 className="nav__account">
                  <a className="nav__link" href={`https://github.com/${this.props.user}`}>
                    <span className="octicon octicon-mention"></span>
                    {this.props.user}
                  </a>
                </h1>
              </li>
              <li className="nav__item">
                <a className="nav__link" role="button" onClick={this.handleSyncData.bind(this)}>
                  <span className="octicon octicon-sync"></span>
                </a>
              </li>
            </ul>
          </nav>
          <ul className="board__list" ref="boardList">{boardLists}</ul>
        </div>
      );
    } else {
      component = <Startup completeStartup={this.completeStartup.bind(this)}/>;
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
