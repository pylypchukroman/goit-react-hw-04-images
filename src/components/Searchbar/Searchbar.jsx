import style from './Searchbar.module.css';
import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    input: '',
  };
  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  hendleSubmit = e => {
    e.preventDefault();
    this.props.changeSearch(this.state.input);
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.hendleSubmit}>
          <button type="submit" className={style.SearchForm__button}>
            <span className={style.Button__label}>Search</span>
          </button>
          <input
            className={style.SearchForm__input}
            type="text"
            autoComplete="off"
            value={this.state.input}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
