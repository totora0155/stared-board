import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import map from 'lodash.map';
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';
import BoardList from 'components/board-list';
import Masonry from 'masonry-layout';
import Startup from 'components/startup';
import Option from 'components/option';
import request from 'modules/request';
import storage from 'modules/storage';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinned: false,
      page: props.user ? 'board' : 'startup',
      user: props.user,
      theme: props.theme || 'light',
    };

    insertTheme(props.theme);
  }

  componentDidMount() {
    if (this.state.page === 'board') {
      this.getData().then((data) => {
        storage.set({data});
        this.setState({
          data,
        });
        layout(this.refs.boardList);
      });
    }
  }

  completeStartup(user) {
    this.setState({
      page: 'board',
    });

    this.getData().then((data) => {
      this.setState({data, user});
      layout(this.refs.boardList);
    });
  }

  completeOption(data) {
    this.setState({
      page: 'board',
    });

    const {user, theme} = data;

    if (data.user !== this.state.user) {
      this.setState({user});
    }

    if (data.theme !== this.state.theme) {
      this.setState({theme});
      insertTheme(theme);
    }

    layout(this.refs.boardList);
  }

  getData(sync) {
    return (async function(user) {
      if (!sync) {
        const data = await storage.get('data');
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

  handlePin() {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      const tab = tabs[0];
      tab.pinned
      ? chrome.tabs.update(tab.id, {pinned: false})
      : chrome.tabs.update(tab.id, {pinned: true});
      this.setState({pinned: !tab.pinned});
    });
  }

  render() {
    const pinClasses = classNames({
      'octicon': true,
      'octicon-pin': true,
      'octicon-pin--active': this.state.pinned,
    });

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
                <a className="nav__link" role="button" data-title="更新"
                  onClick={this.handleSyncData.bind(this)}>
                  <span className="octicon octicon-sync"></span>
                </a>
              </li>
              <li className="nav__item nav__item--right">
                <a className="nav__link" role="button" data-title="ピン"
                  onClick={this.handlePin.bind(this)}>
                  <span className={pinClasses}></span>
                </a>
              </li>
              <li className="nav__item nav__item--right">
                <a className="nav__link" role="button" data-title="設定"
                  onClick={this.handleRoute.bind(this, 'option')}>
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
      component = <Option user={this.state.user} theme={this.state.theme} completeOption={this.completeOption.bind(this)}/>;
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

function insertTheme(theme) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `styles/themes/${theme}.css`;
  document.getElementsByTagName('head')[0].appendChild(link);
}
