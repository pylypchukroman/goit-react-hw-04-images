import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={style.ImageGallery}>
      <ImageGalleryItem images={images} onClick={onClick} />
    </ul>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
