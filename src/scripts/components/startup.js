import React from 'react';
import storage from 'modules/storage';

class Startup extends React.Component {
  handleSubmit() {
    const user = this.refs.name;
    storage.set({user}, true)
      .then(() => {});
  }

  render() {
    return (
      <form className="startup__box" onSubmit="this.handleSubmit.bind(this)">
        <label className="startup__label" for="name">Githubアカウント名</label>
        <div className="startup__input-group">
          <input className="startup__name" type="text" id="name" ref="name"/>
          <input className="startup__submit startup__submit--invalid" type="submit" value="設定"/>
        </div>
      </form>
    );
  }
}

export default Startup;
