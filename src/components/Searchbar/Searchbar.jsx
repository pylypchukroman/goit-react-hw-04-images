import style from './Searchbar.module.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Searchbar = ({ changeSearch }) => {
  const [input, setInput] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setInput(value);
  };

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

Searchbar.propTypes = {
  changeSearch: PropTypes.func.isRequired,
};
export default Searchbar;
