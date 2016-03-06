import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import storage from 'modules/storage';
import Board from 'components/board';

class Startup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.refs.name.value;
    storage.set({user}, true);
    this.props.completeStartup(user);
  }

  handleKeydown(e) {
    setTimeout(() => {
      const inputName = this.refs.name.value;
      this.setState({inputName});
    }, 0);
    return true;
  }

  handlePaste() {
    setTimeout(() => {
      const inputName = this.refs.name.value;
      this.setState({inputName});
    }, 0);
    return true;
  }

  render() {
    const submitClasses = classNames({
      'startup__submit': true,
      'startup__submit--invalid': !this.state.inputName,
    });
    const disabled = !this.state.inputName ? 'disabled' : '';

    return (
      <form className="startup__box" onSubmit={this.handleSubmit.bind(this)}>
        <label className="startup__label" htmlFor="name">
          {chrome.i18n.getMessage('startupLabel')}
        </label>
        <div className="startup__input-group">
          <input className="startup__name" type="text" id="name" ref="name"
            onKeyDown={this.handleKeydown.bind(this)}
            onPaste={this.handlePaste.bind(this)}/>
          <input className={submitClasses} type="submit" disabled={disabled}
            defaultValue={chrome.i18n.getMessage('startupSubmit')} />
        </div>
      </form>
    );
  }
}

export default Startup;
