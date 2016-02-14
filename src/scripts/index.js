import React from 'react';
import ReactDOM from 'react-dom';
import groupBy from 'lodash.groupby';
import map from 'lodash.map';
import sortBy from 'lodash.sortby';
import request from './modules/request';

class RepoItem extends React.Component {
  render() {
    return (
      <li>
        <a href={this.props.url}>{this.props.name}</a>
      </li>
    );
  }
}

class BoardCard extends React.Component {
  render() {
    const repoItems = map(this.props.data.stared, (item) => {
      return <RepoItem key={item.name} url={item.url} name={item.name}/>
    });
    return (
      <li>
        <h2>{this.props.data.lang}</h2>
        <ul>{repoItems}</ul>
      </li>
    );
  }
}

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

request.data.then((res) => {
  const data = JSON.parse(res);
  const grouped = groupBy(data, d => d.language);
  const maped = map(grouped, (stared, lang) => {
    const count = stared.length;
    return {stared, lang, count};
  });
  const sorted = sortBy(maped, d => d.count).reverse();
  console.log(sorted);

  ReactDOM.render(
    <Board name="foo" data={sorted}/>,
    document.getElementById('board')
  );
});
