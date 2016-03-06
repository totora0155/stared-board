import React from 'react';
import storage from 'modules/storage';

class Option extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const data = {
      user: this.refs.user.value,
      theme: this.refs.theme.value,
    };

    save(data).then(() => {
      this.props.completeOption(data);
    });
  }

  render() {
    return (
      <form className="form__box" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form__group">
          <label className="form__label" htmlFor="user">
            {chrome.i18n.getMessage('configUserLabel')}
          </label>
          <input className="form__input" ref="user" id="user" type="text" defaultValue={this.props.user}/>
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="theme">
            {chrome.i18n.getMessage('configThemeLabel')}
          </label>
          <span className="form__select-wrapper">
            <select className="form__select" defaultValue={this.props.theme} ref="theme" id="theme">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </span>
        </div>
        <div className="form__footer">
          <input className="form__submit" type="submit"
            defaultValue={chrome.i18n.getMessage('configSubmit')} />
        </div>
      </form>
    );
  }
}

export default Option;

async function save(data) {
  await Promise.all([
    storage.set({user: data.user}, true),
    storage.set({theme: data.theme}, true),
  ]);
  return;
}
