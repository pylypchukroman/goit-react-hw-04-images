import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, onClick }) =>
  images.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li className={style.ImageGalleryItem} key={id}>
      <img
        src={webformatURL}
        alt={tags}
        className={style.ImageGalleryItem__image}
        onClick={() => {
          onClick(largeImageURL);
        }}
      />
    </li>
  ));

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
