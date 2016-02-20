import React from 'react';
import ReactDOM from 'react-dom';

import request from 'modules/request';
import storage from 'modules/storage';
import Board from 'components/board';

init().then((user) => {
  ReactDOM.render(
    <Board user={user}/>,
    document.getElementById('board')
  );
});

async function init() {
  const {user} = await storage.get('user', true);
  return user;
}
