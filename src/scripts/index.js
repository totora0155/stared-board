import React from 'react';
import ReactDOM from 'react-dom';
import groupBy from 'lodash.groupby';
import map from 'lodash.map';
import sortBy from 'lodash.sortby';
import request from 'modules/request';
import Board from 'components/board';

request.data.then((res) => {
  const data = JSON.parse(res);
  const grouped = groupBy(data, d => d.language);
  const maped = map(grouped, (starred, lang) => {
    const count = starred.length;
    const rate = starred.length / data.length;
    return {starred, lang, count, rate};
  });
  const sorted = sortBy(maped, d => d.count).reverse();
  console.log(sorted);

  ReactDOM.render(
    <Board name="foo" data={sorted}/>,
    document.getElementById('board')
  );
});
