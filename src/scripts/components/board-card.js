import React from 'react';
import map from 'lodash.map';
import RepoItem from 'components/repo-item';

class BoardCard extends React.Component {
  render() {
    const repoItems = map(this.props.data.stared, (item) => {
      return <RepoItem key={item.name} url={item.html_url} name={item.name}/>
    });
    return (
      <li>
        <h2>{this.props.data.lang}</h2>
        <ul>{repoItems}</ul>
      </li>
    );
  }
}

export default BoardCard;
