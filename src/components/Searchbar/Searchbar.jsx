import style from './Searchbar.module.css';
import React, { useState } from 'react';

const Searchbar = ({ changeSearch }) => {
  // state = {
  //   input: '',
  // };
  const [input, setInput] = useState('');

  // handleChange = e => {
  //   this.setState({ input: e.target.value });
  // };

  const handleChange = e => {
    const { value } = e.target;
    setInput(value);
  };

  // hendleSubmit = e => {
  //   e.preventDefault();
  //   this.props.changeSearch(this.state.input);
  // };

  const hendleSubmit = e => {
    e.preventDefault();
    changeSearch(input);
  };

  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={hendleSubmit}>
        <button type="submit" className={style.SearchForm__button}>
          <span className={style.Button__label}>Search</span>
        </button>
        <input
          className={style.SearchForm__input}
          type="text"
          autoComplete="off"
          value={input}
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
