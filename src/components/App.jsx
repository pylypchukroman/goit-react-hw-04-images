import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import React, { Component } from 'react';
import { getImage } from 'utils/imageAPI';
import Button from './Button/Button';
import { Rings } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import style from './App.module.css';

class App extends Component {
  state = {
    images: [],
    search: '',
    page: 1,
    isLoading: false,
    error: null,
    largeImageURL: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.search !== this.state.search && this.state.search) {
    //   this.setState({ isLoading: true, error: null });
    //   getImage(this.state.search)
    //     .then(images => this.setState({ images }))
    //     .catch(err => this.setState({ error: err.message }))
    //     .finally(() => this.setState({ isLoading: false }));
    // }
    // if (prevState.page !== this.state.page && this.state.page !== 1) {
    //   this.setState({ isLoading: true, error: null });
    //   getImage(this.state.search, this.state.page)
    //     .then(images =>
    //       this.setState({ images: [...prevState.images, ...images] })
    //     )
    //     .catch(err => this.setState({ error: err.message }))
    //     .finally(() => this.setState({ isLoading: false }));
    // }
    if (
      (prevState.search !== this.state.search && this.state.search) ||
      (prevState.page !== this.state.page && this.state.page !== 1)
    ) {
      this.setImage();
    }
  }

  setImage = () => {
    this.setState({ isLoading: true, error: null });
    getImage(this.state.search, this.state.page)
      .then(images =>
        this.setState(prev => ({
          images: this.state.page === 1 ? images : [...prev.images, ...images],
        }))
      )
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  changeSearch = search => {
    this.setState({ search, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleClick = image => {
    this.toggleModal();
    this.setState({ largeImageURL: image });
  };
  render() {
    const { images, isLoading, search, error, showModal, largeImageURL } =
      this.state;
    return (
      <div>
        <Searchbar changeSearch={this.changeSearch} />
        {error && <p>{error}</p>}
        {!error && (
          <>
            <ImageGallery images={images} onClick={this.handleClick} />
            {isLoading ? (
              <div className={style.Loader__wrapper}>
                <Rings heigth="100" width="100" color="red" />
              </div>
            ) : (
              search && <Button handleLoadMore={this.handleLoadMore} />
            )}
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
