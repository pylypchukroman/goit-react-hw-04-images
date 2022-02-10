import style from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ handleLoadMore }) => {
  return (
    <div className={style.Button__wrapper}>
      <button onClick={handleLoadMore} type="button" className={style.Button}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};

export default Button;
