import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import React, { useState, useEffect } from 'react';
import { getImage } from 'utils/imageAPI';
import Button from './Button/Button';
import { Rings } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import style from './App.module.css';

const App = () => {
  // state = {
  //   images: [],
  //   search: '',
  //   page: 1,
  //   isLoading: false,
  //   error: null,
  //   largeImageURL: '',
  //   showModal: false,
  // };

  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     (prevState.search !== this.state.search && this.state.search) ||
  //     (prevState.page !== this.state.page && this.state.page !== 1)
  //   ) {
  //     this.setImage();
  //   }
  // }

  useEffect(() => {
    setImage();
    //eslint-disable-next-line
  }, [search, page]);

  // setImage = () => {
  //   this.setState({ isLoading: true, error: null });
  //   getImage(this.state.search, this.state.page)
  //     .then(images =>
  //       this.setState(prev => ({
  //         images: this.state.page === 1 ? images : [...prev.images, ...images],
  //       }))
  //     )
  //     .catch(error => this.setState({ error: error.message }))
  //     .finally(() => this.setState({ isLoading: false }));
  // };

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

  // changeSearch = search => {
  //   this.setState({ search, page: 1 });
  // };

  const changeSearch = search => {
    setSearch(search);
    setPage(1);
  };

  // handleLoadMore = () => {
  //   this.setState(prevState => ({ page: prevState.page + 1 }));
  // };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({ showModal: !showModal }));
  // };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  // handleClick = image => {
  //   this.toggleModal();
  //   this.setState({ largeImageURL: image });
  // };

  const handleClick = image => {
    toggleModal();
    setLargeImageURL(image);
  };

  // const { images, isLoading, search, error, showModal, largeImageURL } =
  //   this.state;
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
