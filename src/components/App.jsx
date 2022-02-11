import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import React, { useState, useEffect } from 'react';
import { getImage } from 'utils/imageAPI';
import Button from './Button/Button';
import { Rings } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import style from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!search) return;
    setImage();
    //eslint-disable-next-line
  }, [search, page]);

  const setImage = () => {
    setIsLoading(true);
    setError(null);
    getImage(search, page)
      .then(images =>
        setImages(prevImages =>
          page === 1 ? images : [...prevImages, ...images]
        )
      )
      .catch(error => setError(error.message))
      .finally(setIsLoading(false));
  };

  const changeSearch = search => {
    setSearch(search);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const handleClick = image => {
    toggleModal();
    setLargeImageURL(image);
  };

  return (
    <div>
      <Searchbar changeSearch={changeSearch} />
      {error && <p>{error}</p>}
      {!error && (
        <>
          <ImageGallery images={images} onClick={handleClick} />
          {isLoading ? (
            <div className={style.Loader__wrapper}>
              <Rings heigth="100" width="100" color="red" />
            </div>
          ) : (
            search && <Button handleLoadMore={handleLoadMore} />
          )}
        </>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default App;
