import React from 'react';

class Option extends React.Component {
  handleSubmit() {
    console.log(this);
  }

  render() {
    return (
      <form className="form__box" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form__group">
          <label className="form__label" htmlFor="name">ユーザー名</label>
          <input className="form__input" id="name" type="text" defaultValue={this.props.user}/>
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="theme">テーマ</label>
          <span className="form__select-wrapper">
            <select className="form__select" ref="theme" id="theme">
              <option defaultValue="light">Light</option>
            </select>
          </span>
        </div>
        <div className="form__footer">
          <input className="form__submit" type="submit" defaultValue="保存"/>
        </div>
      </form>
    );
  }
}

export default Option;
