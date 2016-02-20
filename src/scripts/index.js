import React from 'react';
import ReactDOM from 'react-dom';
import storage from 'modules/storage';
import Board from 'components/board';

init().then((data) => {
  ReactDOM.render(
    <Board user={data.user} theme={data.theme}/>,
    document.getElementById('board')
  );
});

async function init() {
  const [user, theme] = await Promise.all([
    storage.get('user', true),
    storage.get('theme', true),
  ]);
  return {user, theme};
}
