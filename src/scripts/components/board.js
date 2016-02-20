import React from 'react';
import ReactDOM from 'react-dom';
import map from 'lodash.map';
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';
import BoardList from 'components/board-list';
import Masonry from 'masonry-layout';
// import Alert from 'components/alert';
import Startup from 'components/startup';
import Option from 'components/option';
import request from 'modules/request';
import storage from 'modules/storage';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.user ? 'board' : 'startup',
      user: props.user,
    };
  }

  componentDidMount() {
    if (this.state.page === 'board') {
      const {boardList} = this.refs;
      this.getData().then((data) => {
        storage.set({data});
        this.setState({
          data,
        });
        layout(boardList);
      });
    }
  }

  completeStartup(user) {
    this.setState({
      page: 'board',
    });

    this.getData().then((data) => {
      this.setState({data, user});
      const {boardList} = this.refs;
      layout(boardList);
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

  handleRoute(page) {
    this.setState({page});
  }

  render() {
    let component = null;
    if (this.state.page === 'board') {
      const boardLists = map(this.state.data, (langData) => {
        return <BoardList key={langData.lang} data={langData}/>
      });
      component = (
        <div>
          <nav className="nav__box">
            <ul className="nav__list">
              <li className="nav__item">
                <h1 className="nav__account">
                  <a className="nav__link" href={`https://github.com/${this.state.user}`}>
                    <span className="octicon octicon-mention"></span>
                    {this.state.user}
                  </a>
                </h1>
              </li>
              <li className="nav__item">
                <a className="nav__link" role="button" onClick={this.handleSyncData.bind(this)}>
                  <span className="octicon octicon-sync"></span>
                </a>
              </li>
              <li className="nav__item nav__item--right">
                <a className="nav__link" role="button" onClick={this.handleRoute.bind(this, 'option')}>
                  <span className="octicon octicon-gear"></span>
                </a>
              </li>
            </ul>
          </nav>
          <ul className="board__list" ref="boardList">{boardLists}</ul>
        </div>
      );
    } else if (this.state.page === 'startup') {
      component = <Startup completeStartup={this.completeStartup.bind(this)}/>;
    } else if (this.state.page === 'option') {
      component = <Option user={this.state.user}/>;
    }

    return (
      <div>
        {component}
      </div>
    );
  }
}

export default Board;

function layout(boardList) {
  new Masonry(boardList, {
    itemSelector: '.board__lang-box',
    columnWidth: 300,
  });
}
