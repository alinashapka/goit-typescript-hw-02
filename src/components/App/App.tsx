import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BounceLoader } from "react-spinners";

import SearchBar from '../SearchBar/SearchBar';
import { fetchImages } from '../../img-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';

import clsx from 'clsx';
import css from './App.module.css';
import { Image } from '../types/image';

function App() {

const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
    setImages([]);
  };

const incrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetchData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchImages(query, currentPage);
        setImages((prevImages) => [...prevImages, ...data.images]);
        setTotalPages(data.totalPages);
  } catch {
        setIsError(true);
      }
      finally {
        setIsLoading(false);
      }
  
}
    fetchData();
  }, [query, currentPage]);
  
  const isLastPage = currentPage === totalPages - 1;
  const hasImages = images.length > 0;

const openModal = (image: Image) => {
  setSelectedImage(image);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedImage(null);
};

  return (
    <div className={clsx(css.container)}> <SearchBar onSearch={handleSearch}/>
      <Toaster position="top-right" />
      {isError ? <ErrorMessage/> :
        <ImageGallery images={images} onImageClick={openModal} />}
      {isLoading && (
        <div className={clsx(css.wrapper)}>
          <BounceLoader
            color="#ff6200"
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {isModalOpen && selectedImage && <ImageModal isOpen={isModalOpen}
  onRequestClose={closeModal}
  image={selectedImage}/>}
      {hasImages && !isLoading && !isLastPage && (<LoadMoreBtn onClick={incrementPage}/>)}
    </div>
  )
}

export default App
